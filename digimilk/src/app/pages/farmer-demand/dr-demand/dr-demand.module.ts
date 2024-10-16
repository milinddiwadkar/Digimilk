import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrDemandPageRoutingModule } from './dr-demand-routing.module';

import { DrDemandPage } from './dr-demand.page';
import { AddDrDemandModalComponent } from '../../../components/add-dr-demand-modal/add-dr-demand-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DrDemandPageRoutingModule
  ],
  declarations: [DrDemandPage,AddDrDemandModalComponent]
})
export class DrDemandPageModule {}
