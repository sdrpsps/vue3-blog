// #region 获取文章列表
/* 文章列表请求参数 */
export interface articleListData {
  page: number
}
/* 文章列表结果 */
export interface articleListRes {
  meta: articleListMeta
  data: articleListDatum[]
}
export interface articleListDatum {
  id: number
  title: string
  content: string
  categoryId: number
}
export interface articleListMeta {
  code: number
  message: string
  success: boolean
  currPage: number
  pageSize: number
  total: number
  totalPage: number
}
// #endregion

// #region 获取文章详情
/* 文章详情参数 */
export interface articleDeatilData {
  id: number
}
/* 文章详情结果 */
export interface articleDeatilRes {
  meta: articleDetailMeta
  data: articleDetailData
}
export interface articleDetailData {
  id: number
  title: string
  content: string
  categoryId: number
  author: string
}
export interface articleDetailMeta {
  code: number
  message: string
  success: boolean
}
// #endregion

// #region 新增文章
/* 新增文章参数 */
export interface addArticleData {
  categoryId: number
  content: string
  title: string
  author: string
}
/* 新增文章结果 */
export interface addArticleRes {
  data: null
  meta: addArticleMeta
}
export interface addArticleMeta {
  code: number
  message: string
  success: boolean
}
// #endregion

// #region 修改文章
/* 修改文章参数 */
export interface editArticleData {
  categoryId: number
  content: string
  title: string
  author: string
}
/* 修改文章结果 */
export interface editArticleRes {
  data: null
  meta: editArticleResMeta
}
export interface editArticleResMeta {
  code: number
  message: string
  success: boolean
}
// #endregion

// #region 删除文章
/* 删除文章结果 */
export interface deleteArticleRes {
  data: null
  meta: deleteArticleMeta
}
export interface deleteArticleMeta {
  code: number
  message: string
  success: boolean
}
// #endregion
