import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import BillingSection from './BillingSection'
import { apiGetCustomerById } from '@/services/DashboardService'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import type { Project } from '@/views/concepts/projects/ProjectList/types'
import CustomerEdit from '../CustomerEdit'

const { TabNav, TabList, TabContent } = Tabs

const CustomerDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        [`/before/${id}`, { id: id as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetCustomerById<Project, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )

    return (
        <Loading loading={isLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <Card className="w-full">
                        <Tabs defaultValue="billing">
                            <TabList>
                                <TabNav value="activity">Meeting Info </TabNav>
                                <TabNav value="billing">Billing</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="activity">
                                    <CustomerEdit customerData={data}/>
                                </TabContent>
                                <TabContent value="billing">
                                    <BillingSection data={data} />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default CustomerDetails
