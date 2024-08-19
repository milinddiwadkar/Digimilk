import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule


import { AddUsersPage } from './add-users.page'; // Ensure this path is correct
import { AddUsersPageRoutingModule } from './add-users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here

    AddUsersPageRoutingModule
  ],
  declarations: [AddUsersPage]
})
export class AddUsersPageModule {}

