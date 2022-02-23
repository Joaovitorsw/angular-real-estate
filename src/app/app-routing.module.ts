import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      (await import('./domain/home/home.domain.module')).HomeDomainModule,
  },
  {
    path: 'sell',
    loadChildren: async () =>
      (await import('./domain/sell/sell.domain.module')).SellDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
