import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilkCollectionPage } from './milk-collection.page';

const routes: Routes = [
  {
    path: '',
    component: MilkCollectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilkCollectionPageRoutingModule {}
