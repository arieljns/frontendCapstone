import { useEffect, useMemo, useState } from 'react'
import { Button, Card } from '@/components/ui'
import Loading from '@/components/shared/Loading'
import TeamRevenueChart from './components/TeamRevenueChart'
import ConversionRateChart from './components/ConversionRateChart'
import ProductPerformanceTable from './components/ProductPerformanceTable'
import { useManagerSummary } from './hooks/useManagerSummary'

const integerFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
})

const AdminDashboard = () => {
    const {
        weeks,
        error,
        isLoading,
        isRefetching,
        isRefreshing,
        refetch,
        refresh,
    } = useManagerSummary()

    const [selectedWeek, setSelectedWeek] = useState<string>('')
    const latestWeek = weeks[weeks.length - 1]

    useEffect(() => {
        if (latestWeek?.weekStart) {
            setSelectedWeek(latestWeek.weekStart)
        }
    }, [latestWeek?.weekStart])

    const selectedWeekData = useMemo(() => {
        if (!weeks.length) {
            return undefined
        }
        return (
            weeks.find((week) => week.weekStart === selectedWeek) ?? latestWeek
        )
    }, [weeks, selectedWeek, latestWeek])

    const kpis = useMemo(
        () => [
            {
                label: 'Closed Won',
                value: selectedWeekData?.totalClosedWon ?? 0,
                description: 'Deals moved to Closed Won',
            },
            {
                label: 'Closed Lost',
                value: selectedWeekData?.totalClosedLost ?? 0,
                description: 'Deals that churned',
            },
            {
                label: 'Open Deals',
                value: selectedWeekData?.totalOpenDeals ?? 0,
                description: 'Deals still in pipeline',
            },
        ],
        [
            selectedWeekData?.totalClosedWon,
            selectedWeekData?.totalClosedLost,
            selectedWeekData?.totalOpenDeals,
        ],
    )

    const weekOptions = useMemo(
        () =>
            weeks.map((week) => ({
                label: week.label,
                value: week.weekStart,
            })),
        [weeks],
    )

    if (isLoading && !weeks.length) {
        return <Loading loading type="cover" />
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Team Revenue Summary
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {weeks.length
                            ? `Tracking ${weeks.length} weeks of performance data.`
                            : 'No analytics yet - refresh to pull the latest data.'}
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="default"
                        loading={isRefetching}
                        disabled={!weeks.length && isLoading}
                        onClick={() => void refetch()}
                    >
                        Reload
                    </Button>
                    <Button
                        variant="solid"
                        loading={isRefreshing}
                        onClick={() => void refresh()}
                    >
                        Refresh Data
                    </Button>
                </div>
            </div>

            {error && (
                <div className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-400/60 dark:bg-rose-400/10 dark:text-rose-100">
                    <span>{error}</span>
                    <button
                        type="button"
                        className="font-semibold underline-offset-2 hover:underline"
                        onClick={() => void refetch()}
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Showing week:
                </span>
                <select
                    className="rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    value={selectedWeek}
                    onChange={(event) => setSelectedWeek(event.target.value)}
                    disabled={!weeks.length}
                >
                    {weekOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {selectedWeekData && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedWeekData.totalProductsSold.toLocaleString(
                            'id-ID',
                        )}{' '}
                        products sold
                    </span>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {kpis.map((kpi) => (
                    <Card key={kpi.label} className="h-full">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {kpi.label}
                        </p>
                        <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                            {integerFormatter.format(kpi.value)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {kpi.description}
                        </p>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <Card
                    header={{ content: 'Revenue Won vs Revenue Lost' }}
                    className="lg:col-span-2"
                >
                    <TeamRevenueChart weeks={weeks} />
                </Card>
                <Card header={{ content: 'Conversion Rate Trend' }}>
                    <ConversionRateChart weeks={weeks} />
                </Card>
            </div>

            <Card header={{ content: 'Product Performance' }}>
                <ProductPerformanceTable
                    rows={selectedWeekData?.productPerformance ?? []}
                    totalProductsSold={selectedWeekData?.totalProductsSold ?? 0}
                    weekLabel={selectedWeekData?.label ?? 'N/A'}
                />
            </Card>
        </div>
    )
}

export default AdminDashboard
