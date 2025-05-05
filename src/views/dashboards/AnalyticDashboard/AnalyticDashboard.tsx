import { useState } from 'react'
import Loading from '@/components/shared/Loading'
import AnalyticHeader from './components/AnalyticHeader'
import Metrics from './components/Metrics'
import WebAnalytic from './components/AnalyticChart'
import { apiGetAnalyticDashboard } from '@/services/DashboardService'
import useSWR from 'swr'
import type { GetAnalyticDashboardResponse, Period } from './types'
import MarketingDashboard from '../MarketingDashboard'

const AnalyticDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('thisMonth')

    const { data, isLoading } = useSWR(
        ['/api/dashboard/analytic'],
        () => apiGetAnalyticDashboard<GetAnalyticDashboardResponse>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {data && (
                <div className="flex flex-col gap-4">
                    <AnalyticHeader
                        selectedPeriod={selectedPeriod}
                        onSelectedPeriodChange={setSelectedPeriod}
                    />
                    
                    <div className="flex flex-col 2xl:grid grid-cols-4 gap-4">
                        <div className="col-span-4 2xl:col-span-3">
                            <WebAnalytic
                                data={data[selectedPeriod].webAnalytic}
                            />
                            <MarketingDashboard />
                        </div>
                        <div className="2xl:col-span-1">
                            <Metrics
                                data={data[selectedPeriod].metrics}
                                selectedPeriod={selectedPeriod}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default AnalyticDashboard
