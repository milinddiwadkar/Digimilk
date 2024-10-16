import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsPageRoutingModule } from './payments-routing.module';

import { PaymentsPage } from './payments.page';
import { AddPaymentModalComponent } from '../../components/add-payment-modal/add-payment-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PaymentsPageRoutingModule
  ],
  declarations: [PaymentsPage,AddPaymentModalComponent]
})
export class PaymentsPageModule {}
