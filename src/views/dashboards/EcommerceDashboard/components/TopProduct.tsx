import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import type { LeadsPerformanceData } from '../types'

type LeadsPerformanceProps = {
    data: LeadsPerformanceData[]
}

const TopProduct = ({ data }: LeadsPerformanceProps) => {
    const owners = data.map((item) => item.owner)
    const wonSeries = data.map((item) => item.won)
    const lostSeries = data.map((item) => item.lost)

    const topCloser = data.reduce(
        (best, current) =>
            current.won > best.won ? current : best,
        data[0] ?? { owner: 'N/A', won: 0, lost: 0 },
    )

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Team Performance
                        </span>
                        <h4 className="mt-1">Leads Performance</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-4 rounded-2xl bg-indigo-50 p-4 text-sm dark:bg-indigo-500/10">
                <span className="text-gray-600 dark:text-indigo-200">
                    Top closer this period:{' '}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-100">
                        {topCloser.owner}
                    </span>{' '}
                    ({topCloser.won} wins)
                </span>
            </div>
            <Chart
                type="bar"
                height={300}
                series={[
                    { name: 'Won', data: wonSeries },
                    { name: 'Lost', data: lostSeries },
                ]}
                xAxis={owners}
                customOptions={{
                    plotOptions: {
                        bar: {
                            borderRadius: 6,
                            columnWidth: '50%',
                        },
                    },
                    colors: ['#22c55e', '#f97316'],
                    dataLabels: {
                        enabled: true,
                        formatter: (value: number) => value.toString(),
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: (value: number) =>
                                `${value} leads`,
                        },
                    },
                }}
            />
        </Card>
    )
}

export default TopProduct
