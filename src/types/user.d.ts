//获取用户的基本信息
export type userType = {
  code: string;
  message: string;
  data: userItem;
};

export type userItem = {
  //用户id
  id: number;
  //用户名
  username: string;
  //昵称
  nickname: string;
  //邮箱
  email: string;
  user_pic: string;
};
