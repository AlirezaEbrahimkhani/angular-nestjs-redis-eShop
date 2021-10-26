import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageSourceDirective } from './directive/image-source.directive';

@NgModule({
  declarations: [ImageSourceDirective],
  imports: [CommonModule],
  exports: [ImageSourceDirective],
})
export class SharedModule {}
