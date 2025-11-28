import { useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { apiGetAdminDashboardData } from '@/services/DashboardService'

export type ProductPerformance = {
    product_id: string | number
    product_name: string
    total_qty_sold: number | string
    total_revenue: number | string
}

export type WeeklySummary = {
    week_start: string
    total_revenue_won?: number | string | null
    total_revenue_lost?: number | string | null
    total_open_deals?: number | string | null
    total_closed_won?: number | string | null
    total_closed_lost?: number | string | null
    conversion_rate?: number | string | null
    total_products_sold?: number | string | null
    product_performance?: ProductPerformance[] | null
}

export type WeeklySummaryView = {
    weekStart: string
    label: string
    totalRevenueWon: number
    totalRevenueLost: number
    totalOpenDeals: number
    totalClosedWon: number
    totalClosedLost: number
    conversionRate: number
    totalProductsSold: number
    productPerformance: ProductPerformance[]
}

type FetchOptions = {
    silent?: boolean
}

const toNumber = (value?: number | string | null) => {
    if (typeof value === 'number') {
        return Number.isFinite(value) ? value : 0
    }
    if (typeof value === 'string') {
        const parsed = Number.parseFloat(value)
        return Number.isNaN(parsed) ? 0 : parsed
    }
    return 0
}

const normalizeWeek = (week: WeeklySummary): WeeklySummaryView => {
    const label = dayjs(week.week_start).isValid()
        ? dayjs(week.week_start).format('MMM D')
        : week.week_start

    return {
        weekStart: week.week_start,
        label,
        totalRevenueWon: toNumber(week.total_revenue_won),
        totalRevenueLost: toNumber(week.total_revenue_lost),
        totalOpenDeals: toNumber(week.total_open_deals),
        totalClosedWon: toNumber(week.total_closed_won),
        totalClosedLost: toNumber(week.total_closed_lost),
        conversionRate: toNumber(week.conversion_rate),
        totalProductsSold: toNumber(week.total_products_sold),
        productPerformance: Array.isArray(week.product_performance)
            ? week.product_performance.map((product) => ({
                  product_id: product.product_id,
                  product_name: product.product_name,
                  total_qty_sold: toNumber(product.total_qty_sold),
                  total_revenue: toNumber(product.total_revenue),
              }))
            : [],
    }
}

export const useManagerSummary = () => {
    const [rows, setRows] = useState<WeeklySummary[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefetching, setIsRefetching] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const fetchSummary = useCallback(
        async ({ silent = false }: FetchOptions = {}) => {
            const setBusy = silent ? setIsRefetching : setIsLoading
            setBusy(true)
            setError(null)

            try {
                const payload =
                    await apiGetAdminDashboardData<WeeklySummary[]>()
                console.log('this is the payload from manager summary', payload)
                setRows(Array.isArray(payload) ? payload : [])
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError('Unable to fetch summary')
                }
            } finally {
                setBusy(false)
            }
        },
        [],
    )

    useEffect(() => {
        fetchSummary()
    }, [fetchSummary])

    const refetch = useCallback(() => {
        return fetchSummary({ silent: true })
    }, [fetchSummary])

    const refresh = useCallback(async () => {
        setIsRefreshing(true)
        try {
            const response = await fetch('/analytics/refresh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                throw new Error('Failed to trigger analytics refresh')
            }

            await fetchSummary({ silent: true })
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError('Unable to refresh analytics')
            }
        } finally {
            setIsRefreshing(false)
        }
    }, [fetchSummary])

    const weeks = useMemo(() => {
        return rows.map((week) => normalizeWeek(week))
    }, [rows])

    return {
        weeks,
        raw: rows,
        error,
        isLoading,
        isRefetching,
        isRefreshing,
        refetch,
        refresh,
    }
}

export type UseManagerSummary = ReturnType<typeof useManagerSummary>
