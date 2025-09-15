import Loading from '@/components/shared/Loading'
import ProjectOverview from './components/ProjectOverview'
import { apiGetProjectDashboard } from '@/services/DashboardService'
import useSWR from 'swr'
import type { GetProjectDashboardResponse } from './types'
import MeetingDebriefList from './components/MeetingDebriefList'
import ProjectListHeader from '@/views/concepts/projects/ProjectList/components/ProjectListHeader'

const AfterMeetingDashboard = () => {
    const { data, isLoading } = useSWR(
        ['/api/dashboard/project'],
        () => apiGetProjectDashboard<GetProjectDashboardResponse>(),
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
                    <div className="flex gap-4">
                        <div>
                            <ProjectListHeader options={true} />
                            <ProjectOverview />
                            <MeetingDebriefList />
                        </div>
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default AfterMeetingDashboard
