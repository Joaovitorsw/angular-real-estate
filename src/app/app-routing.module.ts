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
    path: 'sale',
    loadChildren: async () =>
      (await import('./domain/view-properties/view-properties.domain.module'))
        .ViewPropertiesDomainModule,
  },
  {
    path: 'rent',
    loadChildren: async () =>
      (await import('./domain/view-properties/view-properties.domain.module'))
        .ViewPropertiesDomainModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
