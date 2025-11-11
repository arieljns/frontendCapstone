import Card from '@/components/ui/Card'
import type { MeetingStats } from '../types'

type MeetingOverviewProps = {
    data: MeetingStats
}

const MeetingOverview = ({ data }: MeetingOverviewProps) => {
    const completionRate =
        data.totalMeetings > 0
            ? Math.round((data.completedDebriefs / data.totalMeetings) * 100)
            : 0

    const pendingRate =
        data.totalMeetings > 0
            ? Math.round((data.pendingMeetings / data.totalMeetings) * 100)
            : 0

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Meeting Overview
                        </span>
                        <h4 className="mt-1">Pipeline Activity Health</h4>
                    </div>
                ),
            }}
        >
            <div className="space-y-6">
                <div>
                    <div className="flex items-baseline justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Meetings / Leads generated
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Includes discovery + follow-up sessions
                            </p>
                        </div>
                        <span className="text-4xl font-semibold text-gray-900 dark:text-white">
                            {data.totalMeetings}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <ProgressRow
                        label="Debriefs completed"
                        value={data.completedDebriefs}
                        percentage={completionRate}
                        barClassName="bg-emerald-500"
                    />
                    <ProgressRow
                        label="Pending meetings"
                        value={data.pendingMeetings}
                        percentage={pendingRate}
                        barClassName="bg-amber-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <StatCard
                        label="Completed Debriefs"
                        value={data.completedDebriefs}
                        helper={`${completionRate}% of all meetings`}
                        accent="text-emerald-500"
                    />
                    <StatCard
                        label="Pending Meetings"
                        value={data.pendingMeetings}
                        helper={`${pendingRate}% awaiting debrief`}
                        accent="text-amber-500"
                    />
                </div>
            </div>
        </Card>
    )
}

const ProgressRow = ({
    label,
    value,
    percentage,
    barClassName,
}: {
    label: string
    value: number
    percentage: number
    barClassName: string
}) => (
    <div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{label}</span>
            <span className="font-semibold text-gray-900 dark:text-white">
                {value}
            </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
            <div
                className={`h-full rounded-full ${barClassName}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
            />
        </div>
    </div>
)

const StatCard = ({
    label,
    value,
    helper,
    accent,
}: {
    label: string
    value: number
    helper: string
    accent: string
}) => (
    <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className={`mt-2 text-3xl font-semibold ${accent}`}>{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{helper}</p>
    </div>
)

export default MeetingOverview
