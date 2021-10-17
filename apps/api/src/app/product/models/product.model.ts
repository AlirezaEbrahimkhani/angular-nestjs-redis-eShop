import { ProductCategoryType } from '../types';

export interface ProductInterface {
  id: string;
  title: string;
  quantity: number;
  price: number;
  img_urls: string[];
  type: ProductCategoryType;
  external_information: any;
}
