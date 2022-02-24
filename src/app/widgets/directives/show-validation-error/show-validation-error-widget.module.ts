import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowValidationErrorDirective } from '.';

@NgModule({
  declarations: [ShowValidationErrorDirective],
  exports: [ShowValidationErrorDirective],
  imports: [CommonModule],
})
export class ShowValidationErrorWidgetModule {}
