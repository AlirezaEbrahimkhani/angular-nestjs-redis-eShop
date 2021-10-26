export interface ApiResponse<T> {
  Data: T;
  Success: boolean;
  Message: string;
}
