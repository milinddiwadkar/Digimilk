import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietySamitiPageRoutingModule } from './society-samiti-routing.module';

import { SocietySamitiPage } from './society-samiti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietySamitiPageRoutingModule
  ],
  declarations: [SocietySamitiPage]
})
export class SocietySamitiPageModule {}
