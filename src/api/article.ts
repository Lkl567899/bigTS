import type { articleType, paramsType } from "@/types/article";
import request from "@/utils/request";
//获取-文章列表 /my/article/list
export const GetMyArticleListAPI = (params: paramsType) => {

  return request.get<any, articleType>("/my/article/list", {
    params
  });
};
