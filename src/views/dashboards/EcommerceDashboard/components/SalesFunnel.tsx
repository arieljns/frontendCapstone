import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { formatCurrency } from '../utils'
import type { FunnelStage } from '../types'

type SalesFunnelProps = {
    data: FunnelStage[]
}

const SalesFunnel = ({ data }: SalesFunnelProps) => {
    if (!data.length) {
        return (
            <Card
                header={{
                    content: (
                        <div>
                            <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                                Sales Funnel / Kanban
                            </span>
                            <h4 className="mt-1">Stage performance</h4>
                        </div>
                    ),
                }}
            >
                <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                    Sales funnel analytics will show up once you start moving tickets through Kanban.
                </div>
            </Card>
        )
    }

    const totalDeals = data.reduce((sum, stage) => sum + stage.totalDeals, 0)
    const totalRevenue = data.reduce((sum, stage) => sum + stage.totalRevenue, 0)
    const categories = data.map((stage) => stage.stage)
    const dealsSeries = data.map((stage) => stage.totalDeals)
    const revenueSeries = data.map((stage) => Number((stage.totalRevenue / 1000).toFixed(2)))

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Sales Funnel / Kanban
                        </span>
                        <h4 className="mt-1">Stage performance</h4>
                    </div>
                ),
            }}
        >
            <div className="space-y-6">
                <div className="flex flex-wrap gap-6">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total deals</p>
                        <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                            {totalDeals}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total revenue</p>
                        <p className="text-3xl font-semibold text-[#f22929]">
                            {formatCurrency(totalRevenue)}
                        </p>
                    </div>
                </div>

                <Chart
                    type="bar"
                    height={320}
                    xAxis={categories}
                    series={[
                        { name: 'Deals', data: dealsSeries },
                        { name: 'Revenue (x1K)', data: revenueSeries },
                    ]}
                    customOptions={{
                        chart: {
                            stacked: true,
                            stackType: 'normal',
                        },
                        colors: ['#94a3b8', '#f22929'],
                        plotOptions: {
                            bar: {
                                columnWidth: '45%',
                                borderRadius: 8,
                                borderRadiusApplication: 'end',
                            },
                        },
                        yaxis: [
                            {
                                title: {
                                    text: 'Deals',
                                },
                            },
                            {
                                opposite: true,
                                title: {
                                    text: 'Revenue (x1K)',
                                },
                                labels: {
                                    formatter: (val: number) => formatCurrency(val * 1000),
                                },
                            },
                        ],
                        tooltip: {
                            shared: true,
                            intersect: false,
                            y: {
                                formatter: (
                                    value: number,
                                    opts: { seriesIndex: number; dataPointIndex: number },
                                ) => {
                                    if (opts.seriesIndex === 0) {
                                        return `${Math.round(value)} deals`
                                    }
                                    const stage = data[opts.dataPointIndex]
                                    return formatCurrency(stage.totalRevenue)
                                },
                            },
                        },
                        legend: {
                            position: 'top',
                        },
                    }}
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-500 dark:text-gray-400">
                                <th className="py-2 pr-4">Stage</th>
                                <th className="py-2 pr-4">Deals</th>
                                <th className="py-2">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((stage) => (
                                <tr
                                    key={stage.stage}
                                    className="border-t border-gray-100 dark:border-gray-700/60"
                                >
                                    <td className="py-2 pr-4 font-medium text-gray-900 dark:text-white">
                                        {stage.stage}
                                    </td>
                                    <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">
                                        {stage.totalDeals}
                                    </td>
                                    <td className="py-2 text-[#f22929] font-semibold">
                                        {formatCurrency(stage.totalRevenue)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    )
}

export default SalesFunnel
