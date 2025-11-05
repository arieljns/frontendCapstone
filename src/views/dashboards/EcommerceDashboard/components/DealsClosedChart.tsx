import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import type { DealsClosedData } from '../types'

type DealsClosedChartProps = {
    data: DealsClosedData[]
}

const DealsClosedChart = ({ data }: DealsClosedChartProps) => {
    const categories = data.map((item) => item.month)
    const closedCounts = data.map((item) => item.count)

    const totalClosed = closedCounts.reduce(
        (aggregate, value) => aggregate + value,
        0,
    )

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Pipeline Velocity
                        </span>
                        <h4 className="mt-1">Deals Closed</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                Total closed last {categories.length} months:{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    {totalClosed}
                </span>{' '}
                deals
            </div>
            <Chart
                type="area"
                height={280}
                series={[{ name: 'Deals Closed', data: closedCounts }]}
                xAxis={categories}
                customOptions={{
                    colors: ['#22c55e'],
                    stroke: { curve: 'smooth', width: 3 },
                    dataLabels: { enabled: false },
                    fill: {
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 0.5,
                            opacityFrom: 0.45,
                            opacityTo: 0,
                            stops: [0, 90, 100],
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: (value: number) => `${value} deals`,
                        },
                    },
                }}
            />
        </Card>
    )
}

export default DealsClosedChart
