import { Component } from '@angular/core';
import { NFC } from '@ionic-native/nfc';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { App, ViewController } from 'ionic-angular';
import { VentaPage } from '../ventas/ventas';

/**
 * Generated class for the NfcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})


export class NfcPage {
  nfcImage: any;
  nfcTexto: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private nfc: NFC,  public viewCtrl: ViewController, public appCtrl: App) {
    this.nfcImage = "assets/img/waitnfc.gif";
    //this.nfcTexto = "Para iniciar una nueva venta <br>aproxime la tarjeta al lector";

      
/*
  	this.nfc.addNdefListener(() => {
  		console.log('successfully attached ndef listener');
	  }, (err) => {
  		console.log('error attaching ndef listener', err);
	  }).subscribe((event) => {
  		console.log('received ndef message. the tag contains: ', event.tag);
  		var idTarjeta = this.nfc.bytesToHexString(event.tag.id);
  		console.log('decoded tag id', idTarjeta);

  		  //let message = this.ndef.textRecord('Hello world');
  		  //this.nfc.share([message]).then(onSuccess).catch(onError);



		  this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getAlumno/'+idTarjeta).map(res => res.json()).subscribe(data => { 

         	//chequeos de saldos
        	
        console.log(data.nombre, data.apellido);
      });

	  });*/






  }


  ionViewDidLoad() {
    this.leerTag();
    console.log('ionViewDidLoad NfcPage');

  }

  iniciaVenta(data) {
    console.log(data.nombre);
    //this.nfcImage = "assets/img/nfcgood.jpg";
    //sleep de 1 segundo??? 
    this.navCtrl.push(VentaPage, {
      alumno: data
    });
  }

  leerTag() {
    this.nfc.addTagDiscoveredListener(() => {
      console.log('bien');
    }, (err) => {
      console.log('mal', err);
    }).subscribe(res => {
      console.log("res " + this.nfc.bytesToHexString(res.tag.id));
      this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getAlumno/'+this.nfc.bytesToHexString(res.tag.id)).map(res => res.json()).subscribe(data => { 
        try {
          
          //this.nfc.removeTagDiscoveredListener();
          this.iniciaVenta(data);
          
          console.log(data.nombre, data.apellido);
        }
        catch (e) {
          console.log("no existe usuario");
          //this.nfcTexto = "No existe usuario";
          //this.nfcImage = "assets/img/nfcerror.jpg";
          this.navCtrl.popToRoot();
        }
        
      });
        // this.nfc.removeTagDiscoveredListener();
    },(err) => console.log(err));
  }


}