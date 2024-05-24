import type { articleType, paramsType } from "@/types/article";
import request from "@/utils/request";
//获取-文章列表 /my/article/list
export const GetMyArticleListAPI = (params: paramsType) => {
  return request.get<any, articleType>("/my/article/list", {
    params,
  });
};
//发布-文章 /my/article/add
export const PostMyArticleAddAPI = (fd: any) => {
  return request.post("/my/article/add", fd);
};
//获取-文章详情 /my/article/info
export const artGetDetailService = (id: string) =>
  request.get("my/article/info", {
    params: {
      id,
    },
  });
//编辑文章
export const artEditService = (data: any) =>
  request.put("my/article/info", data);
//删除文章
export const DeleteMyArticleInfoAPI = (id: string) => {
  return request.delete("/my/article/info", {
    params: {
      id,
    },
  });
};
