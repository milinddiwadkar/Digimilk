import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyMilkCollPageRoutingModule } from './society-milk-coll-routing.module';

import { SocietyMilkCollPage } from './society-milk-coll.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyMilkCollPageRoutingModule
  ],
  declarations: [SocietyMilkCollPage]
})
export class SocietyMilkCollPageModule {}
