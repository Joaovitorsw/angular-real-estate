import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellPage } from './pages/sell-page/sell.page';

const routes: Routes = [
  {
    path: '',
    component: SellPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellDomainRoutingModule {}
