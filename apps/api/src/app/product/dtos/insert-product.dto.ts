import { ProductCategoryType } from '../types';

export interface InsertProductDTO {
  title: string;
  quantity: number;
  price: number;
  img_urls: string[];
  type: ProductCategoryType;
  external_information: any;
}
