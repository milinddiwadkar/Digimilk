import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettlePayPageRoutingModule } from './settle-pay-routing.module';

import { SettlePayPage } from './settle-pay.page';
import { AddSettlePayModalComponent } from '../../../components/add-settle-pay-modal/add-settle-pay-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SettlePayPageRoutingModule
  ],
  declarations: [SettlePayPage, AddSettlePayModalComponent]
})
export class SettlePayPageModule {}
