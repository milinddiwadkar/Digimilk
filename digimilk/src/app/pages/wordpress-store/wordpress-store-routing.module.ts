import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordpressStorePage } from './wordpress-store.page';

const routes: Routes = [
  {
    path: '',
    component: WordpressStorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordpressStorePageRoutingModule {}
