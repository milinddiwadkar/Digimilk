import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueriesPageRoutingModule } from './queries-routing.module';

import { QueriesPage } from './queries.page';
import { AddQueryModalComponent } from '../../components/add-query-modal/add-query-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QueriesPageRoutingModule
  ],
  declarations: [QueriesPage, AddQueryModalComponent]
})
export class QueriesPageModule {}
