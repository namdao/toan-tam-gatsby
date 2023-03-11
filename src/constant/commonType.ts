export interface IResErrors {
  messages: string;
  code: number;
}
export interface IResponseType<T> {
  data?: T;
  errors?: IResErrors;
}
