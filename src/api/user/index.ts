import request, { http } from '@/utils/request'
import type { loginData, loginRes, registerData, registerRes } from './types'

/* 登录 */
export function login(data: loginData) {
    return http.post<loginRes>('login', data)
}

/* 注册 */
export function register(data: registerData) {
    return http.post<registerRes>('register', data)
}