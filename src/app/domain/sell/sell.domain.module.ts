import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SellPage } from './sell-page/sell.page';
import { SellDomainRoutingModule } from './sell.domain.module-routing.module';

@NgModule({
  declarations: [SellPage],
  imports: [CommonModule, SellDomainRoutingModule],
})
export class SellDomainModule {}
