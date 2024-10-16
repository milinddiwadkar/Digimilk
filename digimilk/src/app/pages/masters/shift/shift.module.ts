import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShiftPageRoutingModule } from './shift-routing.module';

import { ShiftPage } from './shift.page';
import { AddShiftModalComponent } from '../../../components/add-shift-modal/add-shift-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ShiftPageRoutingModule
  ],
  declarations: [ShiftPage, AddShiftModalComponent]
})
export class ShiftPageModule {}
