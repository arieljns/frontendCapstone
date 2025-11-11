import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { formatCurrency } from '../utils'
import type { TargetStats } from '../types'

type TargetAttainmentProps = {
    data: TargetStats
}

const TargetAttainment = ({ data }: TargetAttainmentProps) => {
    const progress =
        data.targetAmount > 0
            ? Math.min((data.achievedAmount / data.targetAmount) * 100, 100)
            : 0

    const chartSeries = [
        {
            name: 'Target Plan',
            data: [data.targetAmount, data.targetAmount],
        },
        {
            name: 'Achieved',
            data: [0, data.achievedAmount],
        },
    ]

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Target Attainment
                        </span>
                        <h4 className="mt-1">Quota vs. Actuals</h4>
                    </div>
                ),
            }}
        >
            <div className="space-y-5">
                <Chart
                    type="line"
                    height={220}
                    xAxis={['Plan', 'Current']}
                    series={chartSeries}
                    customOptions={{
                        stroke: {
                            curve: 'stepline',
                            width: 3,
                        },
                        colors: ['#f22929', '#10b981'],
                        markers: {
                            size: 4,
                            strokeColors: '#fff',
                            hover: {
                                sizeOffset: 2,
                            },
                        },
                        tooltip: {
                            y: {
                                formatter: (value: number) => formatCurrency(value),
                            },
                        },
                        yaxis: {
                            labels: {
                                formatter: (value: number) => formatCurrency(value),
                            },
                        },
                    }}
                />

                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">
                                Attainment
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {progress.toFixed(1)}%
                            </span>
                        </div>
                        <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                            <div
                                className="h-full rounded-full bg-[#f22929]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-3">
                            <dt className="text-gray-500 dark:text-gray-400">Target</dt>
                            <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(data.targetAmount)}
                            </dd>
                        </div>
                        <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-3">
                            <dt className="text-gray-500 dark:text-gray-400">Achieved</dt>
                            <dd className="text-lg font-semibold text-emerald-500">
                                {formatCurrency(data.achievedAmount)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </Card>
    )
}

export default TargetAttainment
