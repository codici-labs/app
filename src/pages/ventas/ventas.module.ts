import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VentaPage } from './ventas';



@NgModule({
  declarations: [
    VentaPage,
  ],
  imports: [
    IonicPageModule.forChild(VentaPage),
  ],
})
export class VentasPageModule {}
