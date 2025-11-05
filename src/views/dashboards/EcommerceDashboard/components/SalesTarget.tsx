import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { NumericFormat } from 'react-number-format'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { SalesTargetData } from '../types'

type SalesTargetChartProps = {
    data: SalesTargetData
}

const SalesTarget = ({ data }: SalesTargetChartProps) => {
    const completion =
        data.target === 0 ? 0 : (data.achieved / data.target) * 100

    const radialOptions: ApexOptions = {
        chart: {
            type: 'radialBar',
            sparkline: { enabled: true },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '58%' },
                track: { background: 'rgba(22,163,74,0.12)' },
                dataLabels: {
                    name: { show: false },
                    value: {
                        fontSize: '32px',
                        fontWeight: 600,
                        formatter: (value) => `${Math.round(value)}%`,
                    },
                },
            },
        },
        colors: ['#16a34a'],
        labels: ['Completion'],
    }

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Sales Target
                        </span>
                        <h4 className="mt-1">Target Attainment</h4>
                    </div>
                ),
            }}
        >
            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-4">
                    <ReactApexChart
                        options={radialOptions}
                        series={[completion]}
                        type="radialBar"
                        height={230}
                    />
                    <div className="grid w-full grid-cols-2 gap-4 text-center">
                        <div>
                            <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">
                                Target
                            </span>
                            <span className="text-lg font-semibold">
                                <NumericFormat
                                    displayType="text"
                                    value={data.target}
                                    prefix="Rp"
                                    thousandSeparator
                                />
                            </span>
                        </div>
                        <div>
                            <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">
                                Achieved
                            </span>
                            <span className="text-lg font-semibold text-emerald-500">
                                <NumericFormat
                                    displayType="text"
                                    value={data.achieved}
                                    prefix="Rp"
                                    thousandSeparator
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between gap-6">
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Weekly Velocity
                        </span>
                        <Chart
                            type="line"
                            height={160}
                            series={[
                                { name: 'Deals Closed', data: data.velocity },
                            ]}
                            xAxis={data.velocityPeriods}
                            customOptions={{
                                colors: ['#2563eb'],
                                stroke: { curve: 'smooth', width: 3 },
                                dataLabels: { enabled: false },
                                markers: {
                                    size: 4,
                                    strokeWidth: 2,
                                    strokeColors: '#2563eb',
                                    hover: { size: 5 },
                                },
                                tooltip: {
                                    y: {
                                        formatter: (value: number) =>
                                            `${value} deals`,
                                    },
                                },
                                yaxis: {
                                    forceNiceScale: true,
                                },
                            }}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-emerald-50 p-4 text-sm dark:bg-emerald-500/10">
                            <span className="block text-xs uppercase text-emerald-600 dark:text-emerald-400">
                                Remaining
                            </span>
                            <span className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                <NumericFormat
                                    displayType="text"
                                    value={Math.max(data.target - data.achieved, 0)}
                                    prefix="Rp"
                                    thousandSeparator
                                />
                            </span>
                        </div>
                        <div className="rounded-2xl bg-sky-50 p-4 text-sm dark:bg-sky-500/10">
                            <span className="block text-xs uppercase text-sky-600 dark:text-sky-400">
                                Pace Needed
                            </span>
                            <span className="text-lg font-semibold text-sky-600 dark:text-sky-400">
                                {completion >= 100
                                    ? 'Goal hit'
                                    : `${(100 - completion).toFixed(1)}%`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default SalesTarget
