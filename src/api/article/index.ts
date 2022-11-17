import request, { http } from '@/utils/request'
import type {
  articleListData,
  articleListRes,
  articleDeatilRes,
  articleDeatilData,
  addArticleData,
  addArticleRes,
  editArticleData,
  editArticleRes,
  deleteArticleRes
} from './types'

/* 获取文章列表 */
export function getArticleList(data: articleListData) {
  return http.get<articleListRes>('/article', { params: data })
}

/* 获取文章详情 */
export function getArticleDeatil(data: articleDeatilData) {
  return http.get<articleDeatilRes>(`/article/${data.id}`)
}

/* 新增文章 */
export function addArticle(data: addArticleData) {
  return http.post<addArticleRes>('/article', data)
}

/* 修改文章 */
export function editArticle(id: number, data: editArticleData) {
  return http.patch<editArticleRes>(`/article/${id}`, data)
}
/* 删除文章 */
export function deleteArticle(id: number) {
  return http.delete<deleteArticleRes>(`/article/${id}`)
}
