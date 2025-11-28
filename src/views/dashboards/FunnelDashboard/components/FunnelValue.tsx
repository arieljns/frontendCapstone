import { Card } from '@/components/ui'
import FunnelStats from './FunnelStats'
import { funnelStages } from '../mock'

const FunnelValue = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {funnelStages.map((stage) => (
                <Card
                    key={stage.stage}
                    className="relative h-full overflow-hidden border-t-4"
                    style={{ borderColor: stage.color }}
                >
                    <FunnelStats stage={stage} />
                </Card>
            ))}
        </div>
    )
}

export default FunnelValue
