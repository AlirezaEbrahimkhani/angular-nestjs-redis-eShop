import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderLessTabsDirective } from './directive/header-less-tabs.directive';
import { ImageSourceDirective } from './directive/image-source.directive';

@NgModule({
  declarations: [ImageSourceDirective, HeaderLessTabsDirective],
  imports: [CommonModule],
  exports: [ImageSourceDirective, HeaderLessTabsDirective],
})
export class SharedModule {}
