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
items: Array<{title: string, note: string, icon: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private barcodeScanner: BarcodeScanner) {
  	 this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProducts').map(res => res.json()).subscribe(data => {
        
        this.items = data;
    });
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
     console.log('codigo de barras '+barcodeData);
     this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProduct'+barcodeData).map(res => res.json()).subscribe(data => {
        
        this.items = data;
    });
    }, (err) => {
      console.log(err);
        // An error occurred
    });
  }


}
