import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'angular-nestjs-redis-e-shop-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any = {};

  constructor() {}

  ngOnInit(): void {
    console.log(this.product);
  }
}
