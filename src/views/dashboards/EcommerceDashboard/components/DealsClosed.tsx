import Card from '@/components/ui/Card'
import { PiTrophyBold } from 'react-icons/pi'
import type { DealsStats } from '../types'

type DealsClosedProps = {
    data: DealsStats
}

const DealsClosed = ({ data }: DealsClosedProps) => {
    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Deals Closed
                        </span>
                        <h4 className="mt-1">Win count</h4>
                    </div>
                ),
            }}
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f22929]/10 text-[#f22929]">
                        <PiTrophyBold size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Deals Closed
                        </p>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                            Successful conversions this period
                        </p>
                    </div>
                </div>
                <p className="text-5xl font-semibold text-gray-900 dark:text-white">
                    {data.totalClosedDeals}
                </p>
            </div>
        </Card>
    )
}

export default DealsClosed
