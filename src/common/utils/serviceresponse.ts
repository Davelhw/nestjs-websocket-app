export class ServiceResponse<T> {
  success: boolean = true;
  message: string = '';
  code: number;
  data?: T;

  constructor(
    success: boolean = true,
    message: string = '',
    code: number = 0,
    data?: T,
  ) {
    this.success = success;
    this.message = message;
    this.code = code;
    this.data = data;
  }
}
