import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MediaIfDirective } from './media-if.directive';

@NgModule({
  declarations: [MediaIfDirective],
  exports: [MediaIfDirective],
  imports: [CommonModule],
})
export class MediaIfWidgetModule {}
