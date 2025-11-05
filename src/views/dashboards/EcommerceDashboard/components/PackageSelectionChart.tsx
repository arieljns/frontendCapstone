import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import type { PackageSelectionData } from '../types'

type PackageSelectionChartProps = {
    data: PackageSelectionData[]
}

const PackageSelectionChart = ({ data }: PackageSelectionChartProps) => {
    const series = data.map((item) => item.count)
    const labels = data.map((item) => item.label)
    const total = series.reduce((aggregate, value) => aggregate + value, 0)

    const mostPopular = data.reduce(
        (best, current) => (current.count > best.count ? current : best),
        data[0] ?? { label: 'N/A', count: 0 },
    )

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Packages
                        </span>
                        <h4 className="mt-1">Package Selection Mix</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                Most selected package:{' '}
                <span className="font-semibold text-indigo-600 dark:text-indigo-300">
                    {mostPopular.label}
                </span>
            </div>
            <Chart
                type="donut"
                height={320}
                series={series}
                donutTitle="Total"
                donutText={`${total}`}
                customOptions={{
                    labels,
                    legend: {
                        position: 'bottom',
                    },
                    colors: ['#38bdf8', '#6366f1', '#f97316', '#0ea5e9'],
                    dataLabels: {
                        formatter: (value: number) => `${value.toFixed(1)}%`,
                    },
                }}
            />
        </Card>
    )
}

export default PackageSelectionChart
