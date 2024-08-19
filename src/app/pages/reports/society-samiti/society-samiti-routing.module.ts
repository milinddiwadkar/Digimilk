import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietySamitiPage } from './society-samiti.page';

const routes: Routes = [
  {
    path: '',
    component: SocietySamitiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietySamitiPageRoutingModule {}
