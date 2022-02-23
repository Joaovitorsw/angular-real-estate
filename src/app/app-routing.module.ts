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
  {
    path: 'buy',
    loadChildren: async () =>
      (await import('./domain/view-property/view-property.domain.module'))
        .ViewPropertyDomainModule,
  },
  {
    path: 'rent',
    loadChildren: async () =>
      (await import('./domain/view-property/view-property.domain.module'))
        .ViewPropertyDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
