import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmerScreenMsgPageRoutingModule } from './farmer-screen-msg-routing.module';

import { FarmerScreenMsgPage } from './farmer-screen-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmerScreenMsgPageRoutingModule
  ],
  declarations: [FarmerScreenMsgPage]
})
export class FarmerScreenMsgPageModule {}
