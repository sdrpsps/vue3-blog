import request from "@/utils/request";

export function getArticleList() {
    return request.get('/article', { params: { page: 1 } })
}