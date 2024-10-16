import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietySalesPageRoutingModule } from './society-sales-routing.module';

import { SocietySalesPage } from './society-sales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietySalesPageRoutingModule
  ],
  declarations: [SocietySalesPage]
})
export class SocietySalesPageModule {}
