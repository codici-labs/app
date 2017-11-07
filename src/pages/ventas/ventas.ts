import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ItemDetailsPage } from '../item-details/item-details';
import { NfcPage } from '../nfc/nfc';
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
compra: any;
subtotal: any;
selectedAlumno: any;
//data: Array<{id: string, codigo: string, descripcion: string, stock: string, costo: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private barcodeScanner: BarcodeScanner, public modalCtrl: ModalController, private chRef: ChangeDetectorRef) {
  	//this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProducts').map(res => res.json()).subscribe(data => {
        
      //  this.items = data;
    //});
    this.items = [];
    //this.index = {};
    
    this.subtotal=0.00;
    this.total=0.00;
    this.selectedAlumno = navParams.get('alumno');
    this.compra = {};
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

           //this.navCtrl.setRoot(this.navCtrl.getActive().component);
           console.log('pasa por aca');
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
      this.chRef.detectChanges();
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

  cancelaCompra(){
    this.navCtrl.popToRoot();
  }

  volverNFC(){
    this.navCtrl.push(NfcPage);
  }

  confirmarCompra(){
    
    this.compra.productos = this.items;
    this.compra.alumno = this.selectedAlumno;
    
    console.log(this.compra.alumno.id);
   
    this.http.post('http://codicilabs.com/proyectos/card/index.php/api/confirmarCompra', {alumno: this.compra.alumno, productos: this.compra.productos, total:this.total}).subscribe(data => {
        var myJSON = JSON.stringify(data);
        console.log(myJSON);
        volverNFC();
      }, err => {console.log("ERROR!: ", JSON.stringify(err));});
      
  
  }


}