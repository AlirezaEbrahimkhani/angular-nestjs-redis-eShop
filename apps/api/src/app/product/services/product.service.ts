import { Injectable } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { RedisCacheService } from '../../core/services';
import { DataResponese, ListName } from '../../shared';
import { ProductInterface } from '../models/product.model';
import { ProductCategoryType } from '../types';
import { FilterSearchDTO, InsertProductDTO } from '../dtos';

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
    await this._insertIntoSortedBucket(insertProductDTO);
    let response: any = await this.redisCacheService.set(
      ListName.PRODUCTS,
      allProduct
    );
    await this._insertNewProductToNameSearch(insertProductDTO, uuid);
    if (response === 'OK') return new DataResponese([], true);
    else return new DataResponese([], false);
  }

  async filterProdcut(filterProductDTO: FilterSearchDTO) {
    const { category, productName, sortOrder } = filterProductDTO;
    let response: any;
    if (category)
      response = await this.redisCacheService.get(
        category ?? ListName.PRODUCTS
      );
    if (productName)
      response = await this._filterByName(
        productName,
        response ?? (await this._mapProductsObjectsToArray())
      );
    if (sortOrder) {
      switch (sortOrder) {
        case 1:
          if (response) this._sortArray('bottomUp', response, 'price');
          else response = await this.redisCacheService.get(ListName.BOTTOM_UP);
          break;
        case 2:
          if (response) this._sortArray('topDown', response, 'price');
          else response = await this.redisCacheService.get(ListName.TOP_DOWN);
          break;
      }
    } else {
      response = await this._fetchAllProducts();
    }
    return new DataResponese(response);
  }

  private async _mapProductsObjectsToArray() {
    let prodcuts = await this._fetchAllProducts();
    let productArray: any[] = [];
    Object.keys(prodcuts).forEach((key) => {
      productArray.push({ ...prodcuts[key], id: key });
    });
    return productArray;
  }

  private async _insertIntoSortedBucket(newProduct: InsertProductDTO) {
    let topDownProducts: Object[] =
      (await this.redisCacheService.get(ListName.TOP_DOWN)) ?? [];
    let bottomUpProducts: Object[] =
      (await this.redisCacheService.get(ListName.BOTTOM_UP)) ?? [];
    (topDownProducts ?? []).push(newProduct);
    (bottomUpProducts ?? []).push(newProduct);
    await this.redisCacheService.set(
      ListName.BOTTOM_UP,
      this._sortArray('bottomUp', bottomUpProducts, 'price')
    );
    await this.redisCacheService.set(
      ListName.TOP_DOWN,
      this._sortArray('topDown', topDownProducts, 'price')
    );
  }

  private _sortArray(
    sortOrder: 'topDown' | 'bottomUp',
    productArray: any[],
    sortTerm: string
  ): Object[] {
    if (sortOrder === 'topDown') {
      return (productArray ?? []).sort((a, b) => b[sortTerm] - a[sortTerm]);
    } else {
      return (productArray ?? []).sort((a, b) => a[sortTerm] - b[sortTerm]);
    }
  }

  private async _filterByName(searchTerm: string, productList: any[]) {
    let products = await this._fetchAllNameSearchProducts();
    let filteredProducts: string[] = [];
    Object.keys(products ?? {}).forEach((key) => {
      if ((products[key] as string).includes(searchTerm))
        filteredProducts.push(key);
    });
    return (productList ?? []).filter((prodcut) =>
      filteredProducts.includes(prodcut.id)
    );
  }

  private async _insertNewProductToNameSearch(
    newProduct: InsertProductDTO,
    uuid: string
  ) {
    delete newProduct['id'];
    let nameSearchProducts: Object =
      (await this._fetchAllNameSearchProducts()) ?? {};
    Object.assign(nameSearchProducts, {
      [uuid]: [].concat.apply([], this._extractValues(newProduct)).join(','),
    });
    await this.redisCacheService.set(ListName.NAME_SEARCH, nameSearchProducts);
  }

  private async _fetchAllNameSearchProducts() {
    let products: Object = await this.redisCacheService.get(
      ListName.NAME_SEARCH
    );
    return products;
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

  private _extractValues(productObject): any[] {
    let values = [];
    Object.keys(productObject).forEach((key) => {
      if (typeof productObject[key] === 'string') {
        values.push(productObject[key].toLowerCase());
      } else if (typeof productObject[key] === 'object')
        values = [...values, this._extractValues(productObject[key])];
    });
    return values;
  }
}
