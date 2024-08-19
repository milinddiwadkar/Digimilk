import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorMasterPage } from './supervisor-master.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorMasterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorMasterPageRoutingModule {}
