//注册参数
export type RegisterParams = LoginParams & {
  repassword: string;
};
//登录参数
export type LoginParams = {
  username: string;
  password: string;
};
//登录接口返回参数
export type LoginType = {
  code: string;
  message: string;
  token: string;
};
