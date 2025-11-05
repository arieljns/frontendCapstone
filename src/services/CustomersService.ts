import ApiService from './ApiService'

export async function apiGetTeamMember<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: 'analytics/team-metrics',
        method: 'get',
    })
}

export async function apiGetTeamMemberById<T>(userId: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `analytics/team-metrics/${encodeURIComponent(userId)}`,
        method: 'get',
    })
}

export async function apiDeleteTeamMember<T>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `users/delete/${encodeURIComponent(id)}`,
        method: 'DELETE',
    })
}

export async function apiGetCustomer<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/before/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetCustomerLog<T, U extends Record<string, unknown>>({
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/customer/log`,
        method: 'get',
        params,
    })
}
