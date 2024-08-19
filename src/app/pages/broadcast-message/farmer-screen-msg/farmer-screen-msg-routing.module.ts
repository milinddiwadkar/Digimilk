import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerScreenMsgPage } from './farmer-screen-msg.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerScreenMsgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerScreenMsgPageRoutingModule {}
