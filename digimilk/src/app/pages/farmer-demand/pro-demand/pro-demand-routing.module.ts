import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProDemandPage } from './pro-demand.page';

const routes: Routes = [
  {
    path: '',
    component: ProDemandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProDemandPageRoutingModule {}
