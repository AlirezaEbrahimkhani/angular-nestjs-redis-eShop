import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../core/services';
import { DataResponese, ListName } from '../../shared';
import { CartDTO } from '../dtos';
import { Cart } from '../models';

@Injectable()
export class CartService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getCart(cart_uuid) {
    let cart: Cart = await this.redisCacheService.get<Cart>(
      cart_uuid['cart_uuid']
    );
    if (cart && cart.status != 'Done') {
      let products = await this._fetchCartProducts(cart.products);
      return new DataResponese<Cart>({
        products,
        cart,
      });
    }
    return new DataResponese<Cart>(cart ?? []);
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

  async cartPayment({ cart_uuid }) {
    let customerCart: Cart = {
      status: 'Done',
      payable_amount: 0,
      products: [],
    };
    let response: any = await this.redisCacheService.set(
      cart_uuid,
      customerCart
    );
    if (response === 'OK') return new DataResponese([], true);
    else return new DataResponese([], false);
  }

  private async _fetchCartProducts(products_uuid: string[]) {
    const products: any = await this.redisCacheService.get(ListName.PRODUCTS);
    let cartProdcuts: any[] = [];
    Object.keys(products).forEach((key) => {
      if (products_uuid.includes(key)) cartProdcuts.push(products[key]);
    });
    return cartProdcuts;
  }

  private async _fetchCart(cart_uuid): Promise<Object> {
    let cart: Object = await this.redisCacheService.get(cart_uuid);
    return cart;
  }
}
