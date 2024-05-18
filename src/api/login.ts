import type { RegisterParams, LoginParams, LoginType } from "@/types/login";
import request from "@/utils/request";
//注册接口
export const PostgoRegisterAPI = (data: RegisterParams) => {
  return request.post("/api/reg", data);
};
//登录接口
export const PostApiLoginAPI = (data: LoginParams) => {
  return request.post<any,LoginType>("/api/login", data);
};
