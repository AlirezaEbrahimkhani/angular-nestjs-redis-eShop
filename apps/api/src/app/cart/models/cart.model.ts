import { StatusType } from '../types';

export class Cart {
  status: StatusType;
  payable_amount: number;
  products: string[];
  constructor(newCartDTO) {
    this.status = newCartDTO.status ?? 'Pending';
    this.payable_amount = newCartDTO.payable_amount ?? 0;
    this.products = [newCartDTO.product_uuid] ?? [];
  }
}
