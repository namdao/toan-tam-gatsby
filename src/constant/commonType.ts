export interface IResErrors {
  messages: string | Array<string> | Record<string, string>;
  code: number;
}
export interface IResponseType<T> {
  data?: T;
  errors?: IResErrors;
}
