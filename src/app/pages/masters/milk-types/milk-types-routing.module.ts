import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilkTypesPage } from './milk-types.page';

const routes: Routes = [
  {
    path: '',
    component: MilkTypesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilkTypesPageRoutingModule {}
