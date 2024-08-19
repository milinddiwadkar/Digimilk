import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUsersPage } from './add-users.page'; // Ensure this path is correct

const routes: Routes = [
  {
    path: '',
    component: AddUsersPage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUsersPageRoutingModule {}
