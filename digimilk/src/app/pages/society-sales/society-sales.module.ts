import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietySalesPageRoutingModule } from './society-sales-routing.module';

import { SocietySalesPage } from './society-sales.page';
import { AddSocietySalesModalComponent } from '../../components/add-society-sales-modal/add-society-sales-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SocietySalesPageRoutingModule
  ],
  declarations: [SocietySalesPage,AddSocietySalesModalComponent]
})
export class SocietySalesPageModule {}
