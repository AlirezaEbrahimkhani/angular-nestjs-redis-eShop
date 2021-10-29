import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements AfterViewInit {
  @ViewChild('nameInput') nameInput: any;
  @Output() formChanged = new EventEmitter();
  form: FormGroup = this._formBuilder.group({
    productName: [''],
    category: [''],
    sortOrder: [''],
  });
  constructor(private readonly _formBuilder: FormBuilder) {}

  ngAfterViewInit() {
    fromEvent(this.nameInput.nativeElement, 'input')
      .pipe(
        map((event: any) => (<HTMLInputElement>event.target).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((resp: string) => {
        this.form.controls['productName'].setValue(resp.toLowerCase());
        this.formChanged.emit(this.form.value);
      });
  }
}
