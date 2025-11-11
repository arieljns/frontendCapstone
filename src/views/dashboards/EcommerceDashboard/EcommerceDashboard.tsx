import useSWR from 'swr'
import Loading from '@/components/shared/Loading'
import RevenueOverview from './components/RevenueOverview'
import TargetAttainment from './components/TargetAttainment'
import MeetingOverview from './components/MeetingOverview'
import SentimentFunnel from './components/SentimentFunnel'
import SalesFunnel from './components/SalesFunnel'
import DealsClosed from './components/DealsClosed'
import { apiGetUserDashboard } from '@/services/DashboardService'
import { mockDashboardData } from './mock'
import type { UserDashboardData } from './types'

const EcommerceDashboard = () => {
    const {
        data = mockDashboardData,
        error,
        isLoading,
        mutate,
    } = useSWR<UserDashboardData>(
        ['/analytics/user'],
        () => apiGetUserDashboard<UserDashboardData>(),
        {
            fallbackData: mockDashboardData,
            revalidateOnMount: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    )

    if (isLoading && !data) {
        return <Loading loading type="cover" />
    }

    return (
        <div className="flex flex-col gap-4 max-w-full overflow-x-hidden">
            {error && data && (
                <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-400/60 dark:bg-amber-400/10 dark:text-amber-100">
                    <span>Latest metrics might be stale. Retry to refresh.</span>
                    <button
                        type="button"
                        className="font-semibold underline-offset-2 hover:underline"
                        onClick={() => mutate()}
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <RevenueOverview data={data.revenue} />
                </div>
                <TargetAttainment data={data.target} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                <MeetingOverview data={data.meetings} />
                <SentimentFunnel data={data.sentiment} />
                <DealsClosed data={data.deals} />
            </div>

            <SalesFunnel data={data.funnel} />
        </div>
    )
}

export default EcommerceDashboard
