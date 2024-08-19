import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FarmerLoanDetailPageRoutingModule } from './farmer-loan-detail-routing.module';
import { FarmerLoanDetailPage } from './farmer-loan-detail.page';
import { AddFarmerLoanModalComponent } from '../../../components/add-farmer-loan-modal/add-farmer-loan-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FarmerLoanDetailPageRoutingModule
  ],
  declarations: [FarmerLoanDetailPage, AddFarmerLoanModalComponent]
})
export class FarmerLoanDetailPageModule {}
