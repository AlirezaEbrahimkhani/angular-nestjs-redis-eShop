import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DataResponese } from '../../shared';
import { FilterSearchDTO, InsertProductDTO } from '../dtos';
import { ProductService } from '../services';
import { ProductCategoryType } from '../types';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<DataResponese<Object>> {
    let data = this.productService.getAllProdcut();
    return data;
  }

  @Get(':category')
  getAllProductInSameCategory(
    @Param('category') categoryName: ProductCategoryType
  ): Promise<DataResponese<Object>> {
    let data = this.productService.getAllProdcutByCategory(categoryName);
    return data;
  }

  @Post()
  insertNewProduct(@Body() insertProductDTO: InsertProductDTO) {
    let insertResponse = this.productService.insertNewProduct(insertProductDTO);
    return insertResponse;
  }

  @Post('/filter')
  async filterProduct(@Body() filterProductDTO: FilterSearchDTO) {
    let filterResponse = await this.productService.filterProdcut(filterProductDTO)
    return filterResponse
  }
}
