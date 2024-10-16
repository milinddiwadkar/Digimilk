import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyMilkCollectionPage } from './society-milk-collection.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyMilkCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyMilkCollectionPageRoutingModule {}
