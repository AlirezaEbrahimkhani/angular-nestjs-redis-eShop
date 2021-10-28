import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../core/services';
import { DataResponese } from '../../shared';
import { CartDTO } from '../dtos';
import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getCart(cart_uuid) {
    let cart: Object = await this.redisCacheService.get<[Cart]>(
      cart_uuid['cart_uuid']
    );

    return new DataResponese<Cart>(cart);
  }

  async addProductToCart(cartDTO: CartDTO) {
    const { payable_amount, cart_uuid, product_uuid } = cartDTO;
    let cart: Object = await this._fetchCart(cart_uuid);

    if (cart) {
      let productsSet = new Set(cart['products']);
      productsSet.add(product_uuid);
      let products = Array.from(productsSet);
      if (Array.from(cart['products']).length != products.length)
        cart['payable_amount'] += payable_amount;
      cart['products'] = products;
    } else cart = new Cart(cartDTO);

    let response: any = await this.redisCacheService.set(cart_uuid, cart);
    if (response === 'OK')
      return new DataResponese([], true, 'product added to cart !');
    else return new DataResponese([], false);
  }

  private async _fetchCart(cart_uuid): Promise<Object> {
    let cart: Object = await this.redisCacheService.get(cart_uuid);
    return cart;
  }
}
