import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandsPageRoutingModule } from './demands-routing.module';

import { DemandsPage } from './demands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandsPageRoutingModule
  ],
  declarations: [DemandsPage]
})
export class DemandsPageModule {}
