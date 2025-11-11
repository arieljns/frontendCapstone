import ApiService from './ApiService'

export async function apiGetEcommerceDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/ecommerce',
        method: 'get',
    })
}

export async function apiGetUserDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/analytics/user',
        method: 'get',
    })
}


export async function apiGetProjectDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/before',
        method: 'GET',
    })
}

export async function apiGetMeetingDebrief<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/after',
        method: 'GET',
    })
}

export async function apiCloseMeeting<T>(id: string | number) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/airtable/meetings/${id}`,
        method: 'POST',
    })
}

export async function apiGetCustomerById<T, U extends { id: string }>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/before/${params.id}`,
        method: 'get',
        params,
    })
}

export async function apiGetProjectDashboardById<T>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/before/${id}`,
        method: 'GET',
    })
}

export async function apiGetAnalyticDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/analytic',
        method: 'get',
    })
}

export async function apiGetMarketingDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/api/dashboard/marketing',
        method: 'get',
    })
}
