import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { NumericFormat } from 'react-number-format'
import type { RevenueChartData } from '../types'

type TotalRevenueChartProps = {
    data: RevenueChartData
}

const TotalRevenueChart = ({ data }: TotalRevenueChartProps) => {
    const latestRevenue =
        data.revenue.length > 0 ? data.revenue[data.revenue.length - 1] : 0
    const previousRevenue =
        data.revenue.length > 1 ? data.revenue[data.revenue.length - 2] : 0
    const revenueDelta =
        previousRevenue === 0
            ? 0
            : ((latestRevenue - previousRevenue) / previousRevenue) * 100

    const totalYearToDate = data.revenue.reduce(
        (aggregate, value) => aggregate + value,
        0,
    )

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Total Revenue
                        </span>
                        <h4 className="mt-1">Revenue Performance</h4>
                    </div>
                ),
            }}
        >
            <div className="grid gap-4 md:grid-cols-3 mt-2">
                <div className="md:col-span-2">
                    <Chart
                        type="area"
                        height={320}
                        series={[
                            { name: 'Actual', data: data.revenue },
                            { name: 'Forecast', data: data.forecast },
                        ]}
                        xAxis={data.categories}
                        customOptions={{
                            stroke: { curve: 'smooth', width: 3 },
                            dataLabels: { enabled: false },
                            colors: ['#2563eb', '#38bdf8'],
                            fill: {
                                type: 'gradient',
                                gradient: {
                                    shade: 'light',
                                    type: 'vertical',
                                    opacityFrom: 0.45,
                                    opacityTo: 0.05,
                                    stops: [0, 90, 100],
                                },
                            },
                            yaxis: {
                                labels: {
                                    formatter: (value: number) =>
                                        `Rp${Math.round(value / 1000)}k`,
                                },
                            },
                            legend: {
                                show: true,
                                position: 'top',
                                horizontalAlign: 'left',
                            },
                            tooltip: {
                                y: {
                                    formatter: (value: number) =>
                                        `Rp${value.toLocaleString('id-ID')}`,
                                },
                            },
                        }}
                    />
                </div>
                <div className="flex flex-col gap-4 justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-4">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Current Period
                        </span>
                        <div className="text-2xl font-semibold">
                            <NumericFormat
                                displayType="text"
                                value={latestRevenue}
                                prefix="Rp"
                                thousandSeparator
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Forecast
                        </span>
                        <div className="text-xl font-medium text-emerald-500">
                            <NumericFormat
                                displayType="text"
                                value={
                                    data.forecast[data.forecast.length - 1] ?? 0
                                }
                                prefix="Rp"
                                thousandSeparator
                            />
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Change vs. Prior Period
                        </span>
                    <div
                        className={`text-lg font-medium ${
                            revenueDelta >= 0
                                ? 'text-emerald-500'
                                : 'text-rose-500'
                        }`}
                    >
                        {revenueDelta >= 0 ? '+' : '-'}{' '}
                        {Math.abs(revenueDelta).toFixed(1)}%
                    </div>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Year-to-Date Actual
                        </span>
                        <div className="text-lg">
                            <NumericFormat
                                displayType="text"
                                value={totalYearToDate}
                                prefix="Rp"
                                thousandSeparator
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default TotalRevenueChart
