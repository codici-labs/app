import { Component } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private nfc: NFC, private ndef: Ndef) {



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




	});



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NfcPage');
  }

}
