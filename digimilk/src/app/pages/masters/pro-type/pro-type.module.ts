import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProTypePageRoutingModule } from './pro-type-routing.module';

import { ProTypePage } from './pro-type.page';
import { ProTypeModalComponent } from '../../../components/pro-type-modal/pro-type-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProTypePageRoutingModule
  ],
  declarations: [ProTypePage,ProTypeModalComponent]
})
export class ProTypePageModule {}
