import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
	//TO DO: cambiar el array a como debe ser
	 items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  	/*
  		Traigo el listado de productos completo y lo guardo en el array
  	 */
  	this.http.get('http://codicilabs.com/proyectos/card/index.php/api/getProducts').map(res => res.json()).subscribe(data => {    
        this.items = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  getItems(event){
  	console.log(event);
  }

}
