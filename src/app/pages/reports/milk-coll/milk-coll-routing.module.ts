import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilkCollPage } from './milk-coll.page';

const routes: Routes = [
  {
    path: '',
    component: MilkCollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilkCollPageRoutingModule {}
