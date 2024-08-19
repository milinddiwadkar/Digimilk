import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyMilkCollectionPageRoutingModule } from './society-milk-collection-routing.module';

import { SocietyMilkCollectionPage } from './society-milk-collection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyMilkCollectionPageRoutingModule
  ],
  declarations: [SocietyMilkCollectionPage]
})
export class SocietyMilkCollectionPageModule {}
