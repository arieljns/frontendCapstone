import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import { NumericFormat } from 'react-number-format'
import type { MeetingChartData } from '../types'

type MeetingActivityChartProps = {
    data: MeetingChartData
}

const RevenueByChannel = ({ data }: MeetingActivityChartProps) => {
    const totalMeetings = data.totalMeetings.reduce(
        (aggregate, value) => aggregate + value,
        0,
    )
    const totalUpcoming = data.upcomingMeetings.reduce(
        (aggregate, value) => aggregate + value,
        0,
    )
    const coverage =
        totalMeetings === 0 ? 0 : Math.round((totalUpcoming / totalMeetings) * 100)

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Meetings
                        </span>
                        <h4 className="mt-1">Meeting Pipeline</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">
                        Total Meetings
                    </span>
                    <span className="text-xl font-semibold">
                        <NumericFormat
                            displayType="text"
                            value={totalMeetings}
                            thousandSeparator
                        />
                    </span>
                </div>
                <div>
                    <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">
                        Upcoming
                    </span>
                    <span className="text-xl font-semibold text-sky-500">
                        <NumericFormat
                            displayType="text"
                            value={totalUpcoming}
                            thousandSeparator
                        />
                    </span>
                </div>
                <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                    {coverage}% scheduled
                </div>
            </div>
            <Chart
                type="bar"
                height={280}
                series={[
                    { name: 'Total Meetings', data: data.totalMeetings },
                    { name: 'Upcoming Meetings', data: data.upcomingMeetings },
                ]}
                xAxis={data.categories}
                customOptions={{
                    stacked: false,
                    plotOptions: {
                        bar: {
                            columnWidth: '45%',
                            borderRadius: 6,
                        },
                    },
                    colors: ['#1d4ed8', '#38bdf8'],
                    dataLabels: { enabled: false },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent'],
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                    },
                }}
            />
        </Card>
    )
}

export default RevenueByChannel
