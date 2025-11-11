import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { sentimentPalette } from '../utils'
import type { SentimentStats } from '../types'

type SentimentFunnelProps = {
    data: SentimentStats
}

const SentimentFunnel = ({ data }: SentimentFunnelProps) => {
    const total = data.positive + data.neutral + data.negative
    const series = [data.positive, data.neutral, data.negative]

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Sentiment Funnel
                        </span>
                        <h4 className="mt-1">Meeting sentiment mix</h4>
                    </div>
                ),
            }}
        >
            {total === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    Sentiment analytics will populate after your next meeting debrief.
                </div>
            ) : (
                <div className="space-y-6">
                    <Chart
                        type="donut"
                        height={260}
                        series={series}
                        donutTitle="Meetings"
                        donutText={`${total}`}
                        customOptions={{
                            labels: ['Positive', 'Neutral', 'Negative'],
                            colors: [
                                sentimentPalette.positive,
                                sentimentPalette.neutral,
                                sentimentPalette.negative,
                            ],
                            plotOptions: {
                                pie: {
                                    donut: {
                                        size: '78%',
                                        labels: {
                                            show: true,
                                        },
                                    },
                                },
                            },
                            dataLabels: {
                                enabled: true,
                                formatter: (val: number) => `${val.toFixed(1)}%`,
                            },
                        }}
                    />
                    <ul className="space-y-3">
                        {[
                            { label: 'Positive', value: data.positive, color: sentimentPalette.positive },
                            { label: 'Neutral', value: data.neutral, color: sentimentPalette.neutral },
                            { label: 'Negative', value: data.negative, color: sentimentPalette.negative },
                        ].map((item) => (
                            <li key={item.label} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span
                                        className="inline-block h-2.5 w-2.5 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {item.label}
                                    </span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {item.value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    )
}

export default SentimentFunnel
