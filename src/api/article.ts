import request from "@/utils/request";

export function getArticleDeatil(id: number) {
    return request.get(`/article/${id}`)
}