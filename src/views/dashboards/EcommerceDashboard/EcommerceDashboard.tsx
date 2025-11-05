import Overview from './components/Overview'
import SalesTarget from './components/SalesTarget'
import RevenueByChannel from './components/RevenueByChannel'
import RecentOrder from './components/RecentOrder'
import TopProduct from './components/TopProduct'
import PackageSelectionChart from './components/PackageSelectionChart'
import DealsClosedChart from './components/DealsClosedChart'
import ConversionRateChart from './components/ConversionRateChart'
import MeetingSentimentChart from './components/MeetingSentimentChart'
import { ecommerceDashboardData } from './constants'

const EcommerceDashboard = () => {
    const data = ecommerceDashboardData

    return (
        <div className="flex flex-col gap-4 max-w-full overflow-x-hidden">
            <div className="grid gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <Overview data={data.revenue} />
                </div>
                <SalesTarget data={data.salesTarget} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <RevenueByChannel data={data.meetings} />
                </div>
                <PackageSelectionChart data={data.packages} />
                <MeetingSentimentChart data={data.meetingSentiment} />
                <div className="xl:col-span-2">
                    <RecentOrder data={data.salesFunnel} />
                </div>
                <ConversionRateChart data={data.conversion} />
                <DealsClosedChart data={data.dealsClosed} />
                <TopProduct data={data.leadsPerformance} />
            </div>
        </div>
    )
}

export default EcommerceDashboard
