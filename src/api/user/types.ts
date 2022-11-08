interface Meta {
    code: number;
    message: string;
    success: boolean;
}

/* 登录参数 */
export interface loginData{
    name:string
    password:string
}
/* 登录结果 */
export interface loginRes {
    data: loginResData;
    meta: Meta;
}
export interface loginResData {
    token: string;
}

/* 注册结果 */
export interface registerData {
    name: string;
    password: string;
    password_confirm: string;
}
/* 注册结果 */
export interface registerRes {
    data: null;
    meta: Meta;
}