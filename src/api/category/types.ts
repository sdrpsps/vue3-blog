/* 栏目列表结果 */
export interface categoryListRes {
    data: categoryListDatum[];
    meta: categoryListResMeta;
}
export interface categoryListDatum {
    id: number;
    title: string;
}
interface categoryListResMeta {
    code: number;
    message: string;
    success: boolean;
}