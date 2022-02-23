import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPropertyPage } from './pages/view-property-page/view-property.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPropertyPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPropertyDomainRoutingModule {}
