import { Card } from '@/components/ui'
import FunnelChart from './components/FunnelChart'
import FunnelValue from './components/FunnelValue'
import SentimentChart from './components/SentimentChart'

export default function FunnelDashboard() {
    return (
        <div>
            <div>
                <div>
                    <FunnelValue />
                </div>
                <Card>
                    <h4 className="font-semibold">Sales Funnel</h4>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Excepturi, provident.
                    </p>
                    <FunnelChart />
                </Card>
                <div className="mt-4">
                    <Card>
                        <h4 className="font-semibold">Funnel Sentiment</h4>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Laborum, eveniet.
                        </p>
                        <SentimentChart />
                    </Card>
                </div>
            </div>
        </div>
    )
}
