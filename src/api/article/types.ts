/* 文章列表请求参数 */
export interface articleListData {
    page: number
}
/* 文章列表结果 */
export interface articleListRes {
    meta: articleListMeta;
    data: articleListDatum[];
}
export interface articleListDatum {
    id: number;
    title: string;
    content: string;
    categoryId: number;
}
interface articleListMeta {
    code: number;
    message: string;
    success: boolean;
    currPage: number;
    pageSize: number;
    total: number;
    totalPage: number;
}

/* 文章详情参数 */
export interface articleDeatilData {
    id: number
}
/* 文章详情结果 */
export interface articleDeatilRes {
    meta: articleDetailMeta;
    data: articleDetailData;
}
interface articleDetailData {
    id: number;
    title: string;
    content: string;
    categoryId: number;
}
interface articleDetailMeta {
    code: number;
    message: string;
    success: boolean;
}