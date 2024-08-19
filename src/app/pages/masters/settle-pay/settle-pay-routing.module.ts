import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettlePayPage } from './settle-pay.page';

const routes: Routes = [
  {
    path: '',
    component: SettlePayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlePayPageRoutingModule {}
