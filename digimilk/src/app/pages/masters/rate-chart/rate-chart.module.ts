import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateChartPageRoutingModule } from './rate-chart-routing.module';

import { RateChartPage } from './rate-chart.page';
import { AddRateModalComponent } from '../../../components/add-rate-modal/add-rate-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RateChartPageRoutingModule
  ],
  declarations: [RateChartPage, AddRateModalComponent]
})
export class RateChartPageModule {}
