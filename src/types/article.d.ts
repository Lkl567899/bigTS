//获取文章需要的参数类型
export type paramsType = {
  /**
   *当前页码数
   */

  pagenum: number;
  /**
   *当前页需要的数据条数
   */
  pagesize: number;
  /**
   *文章分类id
   */
  cate_id?: string;
  /**
   *文章状态(可选值"已发布"或"草稿")
   */
  state?: string;
};
//获取文章列表参数类型
export type articleType = {
  /**
   *业务状态码
   */
  status: number;
  /**
   *响应消息
   */
  message: string;
  /**
   *响应数据
   */
  data: articleItem[];
  /**
   *响应匹配数据总数
   */
  total: number;
};
//获取文章列表响应数据参数类型
export type articleItem = {
  /**
   *文章id
   */
  id: number;
  /**
   *文章标题
   */
  title: string;
  /**
   *文章发布时间
   */
  pub_date: string;
  /**
   *文章状态
   */
  state: string | null;
  /**
   *文章所属分类名字
   */
  cate_name: string;
};
