import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyDemandsPage } from './society-demands.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyDemandsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyDemandsPageRoutingModule {}
