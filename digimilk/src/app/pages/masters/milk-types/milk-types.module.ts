import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MilkTypesPageRoutingModule } from './milk-types-routing.module';

import { MilkTypesPage } from './milk-types.page';
import { AddMilkTypeModalComponent } from '../../../components/add-milk-type-modal/add-milk-type-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MilkTypesPageRoutingModule
  ],
  declarations: [MilkTypesPage,AddMilkTypeModalComponent]
})
export class MilkTypesPageModule {}
