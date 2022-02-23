import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewPropertyPage } from './pages/view-property-page/view-property.page';
import { ViewPropertyDomainRoutingModule } from './view-property-routing.module';

@NgModule({
  declarations: [ViewPropertyPage],
  imports: [CommonModule, ViewPropertyDomainRoutingModule],
})
export class ViewPropertyDomainModule {}
