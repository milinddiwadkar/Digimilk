import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QualQuanCheckPageRoutingModule } from './qual-quan-check-routing.module';

import { QualQuanCheckPage } from './qual-quan-check.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QualQuanCheckPageRoutingModule
  ],
  declarations: [QualQuanCheckPage]
})
export class QualQuanCheckPageModule {}
