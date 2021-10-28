import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DataResponese } from '../../shared';
import { CartDTO } from '../dtos';
import { CartService } from '../services';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Body() cart_uuid: string): Promise<DataResponese<Object>> {
    let data = this.cartService.getCart(cart_uuid);
    return data;
  }
  @Post()
  addProductToCart(@Body() cartDTO: CartDTO) {
    let addResponse = this.cartService.addProductToCart(cartDTO);
    return addResponse;
  }
}
