import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchDataWithAxios<SignInResponse>({
        url: '/users/sign-in',
        method: 'post',
        data,
    })
}

export async function apiCreateMember<T>(data: SignUpCredential) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/users/sign-up/member',
        method: 'post',
        data,
    })
}

export async function apiSignUp(data: SignUpCredential) {
    console.log('this are the data from apiCreateMember:', data)
    return ApiService.fetchDataWithAxios({
        url: '/users/sign-up/member',
        method: 'post',
        data,
    })
}

export async function apiSignOut() {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.signOut,
        method: 'post',
    })
}

export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.forgotPassword,
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: endpointConfig.resetPassword,
        method: 'post',
        data,
    })
}
