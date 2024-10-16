import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnionPage } from './union.page';

const routes: Routes = [
  {
    path: '',
    component: UnionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnionPageRoutingModule {}
