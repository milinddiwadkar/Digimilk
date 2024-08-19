import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouteMasterPageRoutingModule } from './route-master-routing.module';

import { RouteMasterPage } from './route-master.page';
import { AddRouteModalComponent } from '../../../components/add-route-modal/add-route-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouteMasterPageRoutingModule
  ],
  declarations: [RouteMasterPage, AddRouteModalComponent]
})
export class RouteMasterPageModule {}
