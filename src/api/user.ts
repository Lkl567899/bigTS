import type { userType } from "@/types/user";
import request from "@/utils/request";
//获取个人信息
export const GetMyUserinfoAPI = () => {
  return request.get<any, userType>("/my/userinfo");
};
//更新-用户头像
export const PatchMyUpdateAvatarAPI = (avatar: string) => {
  return request.patch("/my/update/avatar", { avatar });
};
//更新-用户基本资料
type dataType = {
  id: number | undefined;
  nickname: string | undefined | null;
  email: string | undefined | null;
};
export const PutMyUserinfoAPI = (data: dataType) => {
  return request.put("/my/userinfo", data);
};
//更新-用户密码
type pwdfrom = {
  old_pwd: string;
  new_pwd: string;
  re_pwd: string;
}
export const PatchMyUupdatepwdAPI = (data:pwdfrom) =>{
  return request.patch('/my/updatepwd',data)
}