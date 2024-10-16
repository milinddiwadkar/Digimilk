import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MilkCollectionPageRoutingModule } from './milk-collection-routing.module';
import { MilkCollectionPage } from './milk-collection.page';
import { AddMilkCollectionModalComponent } from '../../components/add-milk-collection-modal/add-milk-collection-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MilkCollectionPageRoutingModule
  ],
  declarations: [MilkCollectionPage, AddMilkCollectionModalComponent]
})
export class MilkCollectionPageModule {}
