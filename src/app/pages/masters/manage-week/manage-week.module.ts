import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageWeekPageRoutingModule } from './manage-week-routing.module';

import { ManageWeekPage } from './manage-week.page';
import { AddWeekModalComponent } from '../../../components/add-week-modal/add-week-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ManageWeekPageRoutingModule
  ],
  declarations: [ManageWeekPage, AddWeekModalComponent]
})
export class ManageWeekPageModule {}
