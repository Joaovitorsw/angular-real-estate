import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPropertiesPage } from './pages/view-properties-page/view-properties.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPropertiesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPropertiesDomainRoutingModule {}
