import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorMasterPageRoutingModule } from './supervisor-master-routing.module';

import { SupervisorMasterPage } from './supervisor-master.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorMasterPageRoutingModule
  ],
  declarations: [SupervisorMasterPage]
})
export class SupervisorMasterPageModule {}
