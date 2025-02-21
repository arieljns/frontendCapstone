import { useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import Progress from '@/components/ui/Progress'
import classNames from '@/utils/classNames'
import type { CustomerDemographicData } from '../types'

type CustomerDemographicProps = {
    data: CustomerDemographicData[]
}

const mapMeta: Record<string, { img: string }> = {
    us: { img: '/img/countries/US.png' },
    br: { img: '/img/countries/BR.png' },
    in: { img: '/img/countries/IN.png' },
    uk: { img: '/img/countries/UK.png' },
    tr: { img: '/img/countries/TR.png' },
    id: { img: '/img/countries/ID.png' },
}

const getMapMeta = (data: CustomerDemographicData[] = []) => {
    return data.map((item) => ({
        ...item,
        ...(mapMeta[item.id as string] || {}),
    }))
}

const CustomerDemographic = ({ data }: CustomerDemographicProps) => {
    const [hovering, setHovering] = useState('')

    return (
        <Card>
            <h4>Top Selling</h4>
            <div className="flex flex-col xl:flex-row items-center gap-4 mt-4">
                <div className="flex flex-col justify-center px-4 2xl:min-w-[340px] xl:w-[300px] w-full">
                    {getMapMeta(data).map((item) => (
                        <div
                            key={item.name}
                            className={classNames(
                                'flex items-center gap-4 p-3 rounded-xl transition-colors duration-150',
                                hovering === item.id &&
                                    'bg-gray-100 dark:bg-gray-700',
                            )}
                            onMouseEnter={() => setHovering(item.id)}
                            onMouseLeave={() => setHovering('')}
                        >
                            <div className="flex gap-2">
                                <Avatar src={item.img} size={30} />
                            </div>
                            <div className="flex-1">
                                <div className="heading-text font-semibold">
                                    {item.name}
                                </div>
                                <Progress
                                    percent={item.value}
                                    trailClass={classNames(
                                        'transition-colors duration-150',
                                        hovering === item.id &&
                                            'bg-gray-200 dark:bg-gray-600',
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default CustomerDemographic
