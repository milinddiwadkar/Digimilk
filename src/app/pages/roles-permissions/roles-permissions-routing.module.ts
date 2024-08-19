import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesPermissionsPage } from './roles-permissions.page';

const routes: Routes = [
  {
    path: '',
    component: RolesPermissionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesPermissionsPageRoutingModule {}
