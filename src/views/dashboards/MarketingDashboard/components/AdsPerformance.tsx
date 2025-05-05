import { useState, useMemo } from 'react'
import Card from '@/components/ui/Card'
import ApexChart from 'react-apexcharts'
import Segment from '@/components/ui/Segment'
import { COLORS } from '@/constants/chart.constant'
import type { AdsPerformanceData } from '../types'

type AdsPerformance = {
    data: AdsPerformanceData
}

const AdsPerformance = ({ data }: AdsPerformance) => {
    const [category, setCategory] = useState('all')

    const { series, labels } = useMemo(() => {
        if (category === 'monthly') {
            return {
                series: data.campagin,
                labels: data.label.map((label) => `${label}`),
            }
        }

        if (category === 'yearly') {
            return {
                series: data.email,
                labels: data.label.map((label) => ` ${label}`),
            }
        }

        
        const totalCampagin = data.campagin.reduce((a, b) => a + b, 0)
        const totalEmail = data.email.reduce((a, b) => a + b, 0)
        return {
            series: [totalCampagin, totalEmail],
            labels: ['Campaign (Total ROI)', 'Email (Total ROI)'],
        }
    }, [category, data])

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Package Selected</h4>
                <div>
                    <Segment
                        className="gap-1"
                        value={category}
                        size="sm"
                        onChange={(val) => setCategory(val as string)}
                    >
                        <Segment.Item value="all">All</Segment.Item>
                        <Segment.Item value="monthly">Monthly</Segment.Item>
                        <Segment.Item value="yearly">Yearly</Segment.Item>
                    </Segment>
                </div>
            </div>
            <div className="mt-6">
                <ApexChart
                    options={{
                        chart: {
                            type: 'donut',
                        },
                        labels,
                        legend: {
                            position: 'bottom',
                        },
                        colors: category === 'all' ? [COLORS[9], COLORS[0]] : COLORS,
                        tooltip: {
                            y: {
                                formatter: (val: number) => `${val}`,
                            },
                        },
                    }}
                    series={series}
                    type="donut"
                    height={480}
                />
            </div>
        </Card>
    )
}

export default AdsPerformance
