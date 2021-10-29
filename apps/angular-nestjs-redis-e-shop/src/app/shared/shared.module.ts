import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InformationRendererComponent } from './components/information-renderer/information-renderer.component';
import { HeaderLessTabsDirective } from './directive/header-less-tabs.directive';
import { ImageSourceDirective } from './directive/image-source.directive';

@NgModule({
  declarations: [
    ImageSourceDirective,
    HeaderLessTabsDirective,
    InformationRendererComponent,
  ],
  imports: [CommonModule],
  exports: [
    ImageSourceDirective,
    HeaderLessTabsDirective,
    InformationRendererComponent,
  ],
})
export class SharedModule {}
