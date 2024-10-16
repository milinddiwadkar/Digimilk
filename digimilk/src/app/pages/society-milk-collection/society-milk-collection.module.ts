import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SocietyMilkCollectionPageRoutingModule } from './society-milk-collection-routing.module';
import { SocietyMilkCollectionPage } from './society-milk-collection.page';
import { AddSocietyMilkCollectionModalComponent } from '../../components/add-society-milk-collection-modal/add-society-milk-collection-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SocietyMilkCollectionPageRoutingModule
  ],
  declarations: [SocietyMilkCollectionPage, AddSocietyMilkCollectionModalComponent]
})
export class SocietyMilkCollectionPageModule {}
