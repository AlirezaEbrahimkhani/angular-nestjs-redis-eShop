import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DataResponese } from '../../shared';
import { CartDTO } from '../dtos';
import { CartService } from '../services';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:cart_uuid')
  getCart(@Param() cart_uuid: string): Promise<DataResponese<Object>> {
    let data = this.cartService.getCart(cart_uuid);
    return data;
  }
  @Post()
  addProductToCart(@Body() cartDTO: CartDTO) {
    let addResponse = this.cartService.addProductToCart(cartDTO);
    return addResponse;
  }

  @Post('/pay/:cart_uuid')
  async cartPayment(@Param() cart_uuid: any) {
    return await this.cartService.cartPayment(cart_uuid);
  }
}
