import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageWeekPage } from './manage-week.page';

const routes: Routes = [
  {
    path: '',
    component: ManageWeekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageWeekPageRoutingModule {}
