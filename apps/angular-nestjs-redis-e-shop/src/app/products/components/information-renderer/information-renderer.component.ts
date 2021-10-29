import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-renderer',
  templateUrl: './information-renderer.component.html',
  styleUrls: ['./information-renderer.component.scss'],
})
export class InformationRendererComponent {
  @Input('information') set info(information: any) {
    Object.keys(information).forEach((key) => {
      const valueType = typeof information[key];
      if (Array.isArray(information[key])) {
        information = {
          ...information,
          [key]: information[key].join(', '),
        };
      }
      switch (valueType) {
        case 'boolean':
          information[key] = valueType ? 'Have' : 'Have not';
          break;
      }
    });
    this._productInformation = information;
  }
  get information() {
    return this._productInformation;
  }

  private _productInformation = {};
}
