import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomePage } from './home-page/home.page';
import { HomeDomainRoutingModule } from './home.domain-routing.module';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, HomeDomainRoutingModule],
})
export class HomeDomainModule {}
