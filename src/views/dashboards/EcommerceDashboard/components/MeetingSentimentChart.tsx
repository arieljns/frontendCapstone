import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import type { MeetingSentimentData } from '../types'

type MeetingSentimentChartProps = {
    data: MeetingSentimentData[]
}

const MeetingSentimentChart = ({ data }: MeetingSentimentChartProps) => {
    const series = data.map((item) => item.score)
    const labels = data.map((item) => item.sentiment)

    const positiveScore =
        data.find((item) => item.sentiment === 'Positive')?.score ?? 0
    const totalScore = series.reduce(
        (aggregate, value) => aggregate + value,
        0,
    )
    const positiveShare =
        totalScore === 0 ? 0 : Math.round((positiveScore / totalScore) * 100)

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Meeting Sentiment
                        </span>
                        <h4 className="mt-1">Sentiment Distribution</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                Positive coverage:{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                    {positiveShare}%
                </span>
            </div>
            <Chart
                type="donut"
                height={280}
                series={series}
                donutTitle="Total"
                donutText={`${totalScore}`}
                customOptions={{
                    labels,
                    colors: ['#22c55e', '#fbbf24', '#f87171'],
                    legend: {
                        position: 'bottom',
                    },
                    dataLabels: {
                        formatter: (value: number) => `${value.toFixed(1)}%`,
                    },
                }}
            />
        </Card>
    )
}

export default MeetingSentimentChart
