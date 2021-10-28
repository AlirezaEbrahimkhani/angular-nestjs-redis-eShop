import { StatusType } from '../../cart/types';
export interface CartStatus {
  status: StatusType;
  payable_amount: string;
}
