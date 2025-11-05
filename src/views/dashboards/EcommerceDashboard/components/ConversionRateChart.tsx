import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import type { ConversionRateData } from '../types'

type ConversionRateChartProps = {
    data: ConversionRateData[]
}

const ConversionRateChart = ({ data }: ConversionRateChartProps) => {
    const categories = data.map((item) => item.channel)
    const rates = data.map((item) => item.percentage)

    const bestChannel = data.reduce(
        (best, current) =>
            current.percentage > best.percentage ? current : best,
        data[0] ?? { channel: 'N/A', percentage: 0 },
    )

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Conversion
                        </span>
                        <h4 className="mt-1">Channel Conversion Rate</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                Highest converting channel:{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    {bestChannel.channel}
                </span>{' '}
                ({bestChannel.percentage}%)
            </div>
            <Chart
                type="bar"
                height={280}
                series={[{ name: 'Conversion Rate', data: rates }]}
                xAxis={categories}
                customOptions={{
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            columnWidth: '55%',
                            borderRadius: 8,
                        },
                    },
                    colors: ['#f59e0b'],
                    dataLabels: {
                        enabled: true,
                        formatter: (value: number) => `${value}%`,
                    },
                    xaxis: {
                        labels: {
                            formatter: (value: number) => `${value}%`,
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: (value: number) => `${value}%`,
                        },
                    },
                }}
            />
        </Card>
    )
}

export default ConversionRateChart
