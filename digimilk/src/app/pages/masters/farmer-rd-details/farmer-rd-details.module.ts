import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerRdDetailsPageRoutingModule } from './farmer-rd-details-routing.module';

import { FarmerRdDetailsPage } from './farmer-rd-details.page';
import { AddFarmerRdDetailModalComponent } from '../../../components/add-farmer-rd-detail-modal/add-farmer-rd-detail-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FarmerRdDetailsPageRoutingModule
  ],
  declarations: [FarmerRdDetailsPage,AddFarmerRdDetailModalComponent]
})
export class FarmerRdDetailsPageModule {}
