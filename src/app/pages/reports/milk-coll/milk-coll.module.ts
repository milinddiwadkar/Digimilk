import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MilkCollPageRoutingModule } from './milk-coll-routing.module';

import { MilkCollPage } from './milk-coll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MilkCollPageRoutingModule
  ],
  declarations: [MilkCollPage]
})
export class MilkCollPageModule {}
