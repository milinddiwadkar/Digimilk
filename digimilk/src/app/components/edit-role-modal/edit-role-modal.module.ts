import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditRoleModalComponent } from './edit-role-modal.component';

@NgModule({
  declarations: [EditRoleModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [EditRoleModalComponent],
})
export class EditRoleModalModule {}
