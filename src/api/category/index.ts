import request, { http } from '@/utils/request'
import { categoryListRes } from './types'

/* 获取栏目列表 */
export function getCategoryList() {
    return http.get<categoryListRes>('/category')
}