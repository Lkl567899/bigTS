//获取-文章分类
export type cateListType = {
  /**
   * 业务状态码
   */
  code: number;
  /**
   * 响应消息
   */
  message: string;
  /**
   * 响应数据
   */
  data: cateItem[];
};
export type cateItem = ruleTpye & {
  /**
   * 文章分类id
   */
  id: number;
};

export type ruleTpye = {
  /**
   * 文章分类名称
   */
  cate_name: string;
  /**
   * 文章分类别名
   */
  cate_alias: string;
};
