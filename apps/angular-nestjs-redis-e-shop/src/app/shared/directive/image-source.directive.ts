import { Directive, ElementRef, Input } from '@angular/core';
import { environment } from 'apps/angular-nestjs-redis-e-shop/src/environments/environment';

@Directive({
  selector: '[imageSource]',
})
export class ImageSourceDirective {
  @Input('imageSource') set item(data: any) {
    if (this.isNotAvailable(data)) {
      this.el.nativeElement.src = 'assets/images/no-image.png';
      this.el.nativeElement.alt = 'No image found !';
    } else {
      this.el.nativeElement.src = environment.imageBaseUrl + data;
      this.el.nativeElement.alt = 'Image :)';
    }
  }

  constructor(private el: ElementRef) {}

  isNotAvailable(value: any) {
    if (value === null || value === undefined || value === '') return true;
    else return false;
  }
}
