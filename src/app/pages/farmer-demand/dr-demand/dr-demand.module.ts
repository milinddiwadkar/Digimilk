import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrDemandPageRoutingModule } from './dr-demand-routing.module';

import { DrDemandPage } from './dr-demand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrDemandPageRoutingModule
  ],
  declarations: [DrDemandPage]
})
export class DrDemandPageModule {}
