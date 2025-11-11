import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { formatCurrency, formatPercent } from '../utils'
import type { RevenueStats } from '../types'

type RevenueOverviewProps = {
    data: RevenueStats
}

const RevenueOverview = ({ data }: RevenueOverviewProps) => {
    const metrics = [
        {
            label: 'Active Total Revenue',
            helper: 'Closed Won value',
            value: data.totalRevenue,
            formatter: formatCurrency,
        },
        {
            label: 'Total Revenue Lost',
            helper: 'Closed Lost value',
            value: data.lostRevenue,
            formatter: formatCurrency,
        },
        {
            label: 'Conversion Rate',
            helper: 'Closed Won / Total Leads',
            value: data.conversionRate,
            formatter: (value?: number | null) => formatPercent(value ?? null),
        },
    ]

    const trendSeries =
        data.trend && data.trend.length > 0
            ? [
                  {
                      name: 'Total Revenue',
                      data: data.trend.map((point) => point.totalRevenue),
                  },
                  {
                      name: 'Revenue Lost',
                      data: data.trend.map((point) => point.lostRevenue),
                  },
              ]
            : []

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Revenue
                        </span>
                        <h4 className="mt-1">Sales Impact Overview</h4>
                    </div>
                ),
            }}
        >
            <div className="space-y-6">
                <div>
                    <Chart
                        type="line"
                        height={260}
                        series={trendSeries}
                        xAxis={data.trend?.map((point) => point.period) ?? []}
                        customOptions={{
                            stroke: { curve: 'smooth', width: 3 },
                            colors: ['#f22929', '#fb7185'],
                            yaxis: {
                                labels: {
                                    formatter: (value: number) => formatCurrency(value),
                                },
                            },
                            tooltip: {
                                y: {
                                    formatter: (value: number) => formatCurrency(value),
                                },
                            },
                            markers: {
                                size: 5,
                                strokeColors: '#fff',
                                hover: { sizeOffset: 3 },
                            },
                        }}
                    />
                    {!data.trend?.length && (
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Revenue trend data will appear after at least one full week of activity.
                        </p>
                    )}
                </div>

                <div className="grid gap-4 md:grid-cols-3 min-w-0">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-4"
                        >
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                {metric.label}
                            </p>
                            <p className="mt-2 text-xl font-semibold text-gray-700 dark:text-white">
                                {metric.formatter(metric.value)}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {metric.helper}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default RevenueOverview
