import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { RedisCacheService } from '../../core/services';
import { DataResponese, ListName } from '../../shared';
import { ProductInterface } from '../models/product.model';
import { ProductCategoryType } from '../types';
import { InsertProductDTO } from '../dtos';

@Injectable()
export class ProductService {
  constructor(private readonly redisCacheService: RedisCacheService) {}

  async getAllProdcut() {
    let products: Object = await this.redisCacheService.get<ProductInterface[]>(
      ListName.PRODUCTS
    );
    return new DataResponese<ProductInterface>(products);
  }

  async getAllProdcutByCategory(categoryName: ProductCategoryType) {
    let products: Object = await this.redisCacheService.get<Object>(
      categoryName
    );
    return new DataResponese<Object>(products);
  }

  async insertNewProduct(insertProductDTO: InsertProductDTO) {
    let uuid = uuidv4();
    let allProduct: Object = await this._fetchAllProducts();
    allProduct = { ...allProduct, [uuid]: insertProductDTO };
    await this._insertNewProdcutToItsCategory(insertProductDTO, uuid);
    let response: any = await this.redisCacheService.set(
      ListName.PRODUCTS,
      allProduct
    );
    if (response === 'OK') return new DataResponese([], true);
    else return new DataResponese([], false);
  }

  private async _insertNewProdcutToItsCategory(
    newProdcut: InsertProductDTO,
    uuid: string
  ) {
    let productsInCategory: any[] =
      (await this._fetchAllProductsByCategory(newProdcut.type)) ?? [];
    productsInCategory.push(Object.assign(newProdcut, { id: uuid }));
    await this.redisCacheService.set(newProdcut.type, productsInCategory);
  }

  private async _fetchAllProductsByCategory(categoryName: ProductCategoryType) {
    let prodcuts: any[] = await this.redisCacheService.get(categoryName);
    return prodcuts;
  }

  private async _fetchAllProducts(): Promise<Object> {
    let prodcuts: Object = await this.redisCacheService.get(ListName.PRODUCTS);
    return prodcuts;
  }
}
