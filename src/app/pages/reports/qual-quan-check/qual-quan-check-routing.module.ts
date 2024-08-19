import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QualQuanCheckPage } from './qual-quan-check.page';

const routes: Routes = [
  {
    path: '',
    component: QualQuanCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QualQuanCheckPageRoutingModule {}
