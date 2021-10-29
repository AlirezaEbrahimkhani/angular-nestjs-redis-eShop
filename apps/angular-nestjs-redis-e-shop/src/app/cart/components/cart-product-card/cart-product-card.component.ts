import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss'],
})
export class CartProductCardComponent implements OnInit {
  @Input() product: any = {};

  constructor() {}

  ngOnInit(): void {}
}
