import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmerRdDetailsPage } from './farmer-rd-details.page';

const routes: Routes = [
  {
    path: '',
    component: FarmerRdDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmerRdDetailsPageRoutingModule {}
