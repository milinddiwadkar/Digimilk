import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProTypePage } from './pro-type.page';

const routes: Routes = [
  {
    path: '',
    component: ProTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProTypePageRoutingModule {}
