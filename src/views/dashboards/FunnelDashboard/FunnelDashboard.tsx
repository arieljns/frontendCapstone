import { Card } from '@/components/ui'
import FunnelChart from './components/FunnelChart'
import FunnelValue from './components/FunnelValue'
import SentimentChart from './components/SentimentChart'

const FunnelDashboard = () => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Sales Funnel Overview
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Track the pipeline from quotation to close, monitor drop-off
                    points, and keep an eye on sentiment at every stage.
                </p>
            </div>

            <FunnelValue />

            <div className="grid gap-4 lg:grid-cols-3">
                <Card
                    header={{ content: 'Sales Funnel Performance' }}
                    className="lg:col-span-2"
                >
                    <FunnelChart />
                </Card>
                <Card header={{ content: 'Stage Sentiment' }}>
                    <SentimentChart />
                </Card>
            </div>
        </div>
    )
}

export default FunnelDashboard
