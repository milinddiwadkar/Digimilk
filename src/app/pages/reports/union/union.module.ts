import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnionPageRoutingModule } from './union-routing.module';

import { UnionPage } from './union.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnionPageRoutingModule
  ],
  declarations: [UnionPage]
})
export class UnionPageModule {}
