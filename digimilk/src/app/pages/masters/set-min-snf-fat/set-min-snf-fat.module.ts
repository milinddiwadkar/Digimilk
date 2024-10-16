import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetMinSnfFatPageRoutingModule } from './set-min-snf-fat-routing.module';

import { SetMinSnfFatPage } from './set-min-snf-fat.page';
import { AddSnfFatModalComponent } from '../../../components/add-snf-fat-modal/add-snf-fat-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SetMinSnfFatPageRoutingModule
  ],
  declarations: [SetMinSnfFatPage, AddSnfFatModalComponent]
})
export class SetMinSnfFatPageModule {}
