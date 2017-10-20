import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ItemDetailsPage } from '../item-details/item-details';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
index: any;
//data: Array<{id: string, codigo: string, descripcion: string, stock: string, costo: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private barcodeScanner: BarcodeScanner) {
  	//this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProducts').map(res => res.json()).subscribe(data => {
        
      //  this.items = data;
    //});
    this.items = [];
    this.index = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VentaPage');
  }

 

  venta(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  showCamera(){
    
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log('codigo de barras '+barcodeData.text);
      
      this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProduct/'+barcodeData.text).map(res => res.json()).subscribe(data => { 

        //this.items = this.items+data;
        
        
        //ultimo = length(this.items);
        //this.items[ultimo+1] = data;
        console.log(this.index, this.items);
         if(typeof this.index[data.codigo] === "undefined"){ 
           data.cantidad = 1;
           this.items.push(data);
           this.index[data.codigo] = this.items.length;
         } else {
           this.items[this.index[data.codigo]].cantidad += 1;
         }

        //}
        //console.log(this.index, this.items);
      });
     
    }, (err) => {
      console.log(err);
        // An error occurred
    });
  }


}
