import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetMinSnfFatPage } from './set-min-snf-fat.page';

const routes: Routes = [
  {
    path: '',
    component: SetMinSnfFatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetMinSnfFatPageRoutingModule {}
