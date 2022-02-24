import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomErrorStateMatcher } from 'app/widgets/directives/show-validation-error';
import { ShowValidationErrorWidgetModule } from 'app/widgets/directives/show-validation-error/show-validation-error-widget.module';
import { SellPage } from './pages/sell-page/sell.page';
import { SellDomainRoutingModule } from './sell-routing.module';

@NgModule({
  declarations: [SellPage],
  imports: [
    CommonModule,
    SellDomainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ShowValidationErrorWidgetModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
  ],
})
export class SellDomainModule {}
