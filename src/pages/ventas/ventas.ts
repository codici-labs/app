import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ItemDetailsPage } from '../item-details/item-details';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

/**
 * Generated class for the VentasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ventas',
  templateUrl: 'ventas.html',
})


export class VentaPage {
//var items: Array<{id: string, codigo: string, descripcion: string, stock: string, costo: strin>;
items: Array<any>;
//index: any;
total: any;
subtotal: any;
//data: Array<{id: string, codigo: string, descripcion: string, stock: string, costo: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private barcodeScanner: BarcodeScanner, public modalCtrl: ModalController) {
  	//this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProducts').map(res => res.json()).subscribe(data => {
        
      //  this.items = data;
    //});
    this.items = [];
    //this.index = {};
    this.subtotal=0.00;
    this.total=0.00;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentaPage');
  }

 

  venta(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  buscarProductos(characterNum){
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }


  showCamera(){
    
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log('codigo de barras '+barcodeData.text);
      
      this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProduct/'+barcodeData.text).map(res => res.json()).subscribe(data => { 

        //this.items = this.items+data;
        
        
        //ultimo = length(this.items);
        //this.items[ultimo+1] = data;
        /*
        console.log(this.items);
         if(typeof this.items[data.codigo] === "undefined"){ 
           data.cantidad = 1;
           this.items[data.codigo] = data;
           //this.index[data.codigo] = (this.items.length -1);
         } else {
           this.items[data.codigo].cantidad += 1;
         }
         */
         var existe = false;
         for (let i=0; i<this.items.length; i++){
           if (this.items[i].codigo == data.codigo) {
             this.items[i].cantidad++;
             existe=true; 
           }
         }
         if (!existe) {
           data.cantidad = 1;
           this.items.push(data);
         }
        this.actualizaTotal();
        //console.log(this.index, this.items);
      });
     
    }, (err) => {
      console.log(err);
        // An error occurred
    });
  }

  actualizaTotal(){
    this.total = 0;
    for(let i=0; i<this.items.length; i++){
      this.subtotal = ((this.items[i].cantidad)*(this.items[i].costo));
      this.total = this.total+this.subtotal;
    }
  }

  sumaCantidad(codigo){
    //console.log(this.items[this.index[codigo]].cantidad);
    //this.items[this.index[codigo]].cantidad += 1;
    for(let i=0; i<this.items.length; i++){
      if (this.items[i].codigo == codigo) {
        this.items[i].cantidad++; 
      }
    }
    this.actualizaTotal();
  }

  restaCantidad(codigo){
    //console.log(this.items[this.index[codigo]].cantidad);
    //if (this.items[this.index[codigo]].cantidad != 1) {
    //  this.items[this.index[codigo]].cantidad = (this.items[this.index[codigo]].cantidad - 1);
    //}
    for(let i=0; i<this.items.length; i++){
      if (this.items[i].codigo == codigo) {
        if (this.items[i].cantidad != 1) {
          this.items[i].cantidad = this.items[i].cantidad - 1;
        } 
      }
    }
    this.actualizaTotal();
  }

  borraItem(codigo){
    //console.log(this.index.indexOf(codigo));
    //this.items.splice(this.index[codigo],1);
    //this.index.splice(this.index.indexOf(codigo),1);
    //delete this.index[codigo];
    for(let i=0; i<this.items.length; i++){
      if (this.items[i].codigo == codigo) {
        this.items.splice(i,1); 
      }
    }
    this.actualizaTotal();
  }


}
@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Description
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        <ion-avatar item-start>
          <img src="{{character.image}}">
        </ion-avatar>
        <h2>{{character.name}}</h2>
        <p>{{character.quote}}</p>
      </ion-item>
      <ion-item *ngFor="let item of character['items']">
        {{item.title}}
        <ion-note item-end>
          {{item.note}}
        </ion-note>
      </ion-item>
  </ion-list>
</ion-content>
`
})
export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}