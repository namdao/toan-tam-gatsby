export type IRequestLogin = {
  identity: string;
  password: string;
  callbackError?: (message: string) => void;
};

export type IResRoles = {
  description: string;
  id: number;
  name: string;
};
export type IResUser = {
  created_time: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
  roles: IResRoles[];
};
export type IResLogin = {
  token: string;
  user: IResUser;
};
