import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProDemandPageRoutingModule } from './pro-demand-routing.module';

import { ProDemandPage } from './pro-demand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProDemandPageRoutingModule
  ],
  declarations: [ProDemandPage]
})
export class ProDemandPageModule {}
