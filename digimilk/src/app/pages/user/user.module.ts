import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';
import { UserPage } from './user.page';
import { AddUserModalComponent } from '../../components/add-user-modal/add-user-modal.component'; // Assuming you have this component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserPageRoutingModule
  ],
  declarations: [UserPage, AddUserModalComponent]  // Ensure these are correct
})
export class UserPageModule {}
