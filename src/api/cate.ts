import type { cateItem, cateListType, ruleTpye } from "@/types/cate";
import request from "@/utils/request";
//获取-文章分类
export const GetMyCateListAPI = () => {
  return request.get<any, cateListType>("/my/cate/list");
};
//更新-文章分类
export const PutMyCateListAPI = (data: cateItem) => {
  return request.put("/my/cate/info", data);
};
//增加-文章分类
export const PostMyCateAddAPI = (data: ruleTpye) => {
  return request.post("/my/cate/add", data);
};
//删除-文章分类
export const DeleteMyCateDelAPI = (id: number) => {
  return request.delete("/my/cate/del", {
    params: {
      id,
    },
  });
};
