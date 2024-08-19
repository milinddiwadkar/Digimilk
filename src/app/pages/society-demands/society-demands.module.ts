import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyDemandsPageRoutingModule } from './society-demands-routing.module';

import { SocietyDemandsPage } from './society-demands.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyDemandsPageRoutingModule
  ],
  declarations: [SocietyDemandsPage]
})
export class SocietyDemandsPageModule {}
