import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProDemandPageRoutingModule } from './pro-demand-routing.module';

import { ProDemandPage } from './pro-demand.page';
import { AddProductDemandModalComponent } from '../../../components/add-product-demand-modal/add-product-demand-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProDemandPageRoutingModule
  ],
  declarations: [ProDemandPage,AddProductDemandModalComponent]
})
export class ProDemandPageModule {}
