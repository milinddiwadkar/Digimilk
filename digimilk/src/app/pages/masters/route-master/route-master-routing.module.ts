import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteMasterPage } from './route-master.page';

const routes: Routes = [
  {
    path: '',
    component: RouteMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteMasterPageRoutingModule {}
