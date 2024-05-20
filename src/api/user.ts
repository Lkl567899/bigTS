import type { userType } from "@/types/user";
import request from "@/utils/request";
export const GetMyUserinfoAPI = () => {
  return request.get<any,userType>("/my/userinfo");
};
