export class DataResponese<T> {
  Data: T;
  Success: boolean;
  Message: string;
  constructor(Data: any = [], Success: boolean = true, Message: string = '') {
    this.Data = Data;
    this.Success = Success;
    this.Message = Message;
  }
}
