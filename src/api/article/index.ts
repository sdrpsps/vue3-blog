import request, { http } from '@/utils/request'
import type { articleListData, articleListRes, articleDeatilRes, articleDeatilData } from './types'

/* 获取文章列表 */
export function getArticleList(data: articleListData) {
    return http.get<articleListRes>('/article', { params: data })
}

/* 获取文章详情 */
export function getArticleDeatil(data: articleDeatilData) {
    return http.get<articleDeatilRes>(`/article/${data.id}`);
}
