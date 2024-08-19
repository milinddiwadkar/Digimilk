import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPermissionsPageRoutingModule } from './roles-permissions-routing.module';

import { RolesPermissionsPage } from './roles-permissions.page';
import { EditRoleModalModule } from '../../components/edit-role-modal/edit-role-modal.module'; // Adjust the path accordingly


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPermissionsPageRoutingModule,
    EditRoleModalModule,  // Import the module here
  ],
  declarations: [RolesPermissionsPage]
})
export class RolesPermissionsPageModule {}
