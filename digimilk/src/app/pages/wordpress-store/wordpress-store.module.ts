import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordpressStorePageRoutingModule } from './wordpress-store-routing.module';

import { WordpressStorePage } from './wordpress-store.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordpressStorePageRoutingModule
  ],
  declarations: [WordpressStorePage]
})
export class WordpressStorePageModule {}
