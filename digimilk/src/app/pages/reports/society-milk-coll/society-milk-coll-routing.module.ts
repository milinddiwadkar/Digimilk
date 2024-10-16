import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyMilkCollPage } from './society-milk-coll.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyMilkCollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyMilkCollPageRoutingModule {}
