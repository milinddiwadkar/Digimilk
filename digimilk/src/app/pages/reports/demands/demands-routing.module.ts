import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandsPage } from './demands.page';

const routes: Routes = [
  {
    path: '',
    component: DemandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandsPageRoutingModule {}
