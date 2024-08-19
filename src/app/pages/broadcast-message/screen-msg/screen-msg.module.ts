import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenMsgPageRoutingModule } from './screen-msg-routing.module';

import { ScreenMsgPage } from './screen-msg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenMsgPageRoutingModule
  ],
  declarations: [ScreenMsgPage]
})
export class ScreenMsgPageModule {}
