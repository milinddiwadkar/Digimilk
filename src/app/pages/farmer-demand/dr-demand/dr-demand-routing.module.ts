import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrDemandPage } from './dr-demand.page';

const routes: Routes = [
  {
    path: '',
    component: DrDemandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrDemandPageRoutingModule {}
