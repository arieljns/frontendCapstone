import { useEffect, useRef } from 'react'
import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import GrowShrinkValue from '@/components/shared/GrowShrinkValue'
import { COLORS } from '@/constants/chart.constant'
import { useThemeStore } from '@/store/themeStore'
import { NumericFormat } from 'react-number-format'
import type { WebAnalyticData } from '../types'

type WebAnalyticProps = {
    data: WebAnalyticData
}

const LeadsVolume = ({ data }: WebAnalyticProps) => {
    const isFirstRender = useRef(true)

    const sideNavCollapse = useThemeStore(
        (state) => state.layout.sideNavCollapse,
    )

    useEffect(() => {
        if (!sideNavCollapse && isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (!isFirstRender.current) {
            window.dispatchEvent(new Event('resize'))
        }
    }, [sideNavCollapse])

    return (
        <Card className="h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h4>Leads Volume</h4>
                <div className="inline-flex items-center gap-6">
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded"
                            style={{ backgroundColor: COLORS[0] }}
                        />
                        <div>SDR</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded"
                            style={{ backgroundColor: COLORS[7] }}
                        />
                        <div>Inbound</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div
                            className="h-3.5 w-3.5 rounded"
                            style={{ backgroundColor: COLORS[8] }}
                        />
                        <div>Outbound</div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex items-center gap-10">
                    <div>
                        <div className="mb-2">Avg. Leads From Outbound</div>
                        <div className="flex items-end gap-2">
                            <h3>
                                <NumericFormat
                                    displayType="text"
                                    value={90}
                                    thousandSeparator={true}
                                />
                            </h3>
                            <GrowShrinkValue
                                className="font-bold"
                                value={data.pageView.growShrink}
                                suffix="%"
                                positiveIcon="+"
                                negativeIcon=""
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">Avg. Leads From Inbound</div>
                        <div className="flex items-end gap-2">
                            <h3>
                                <NumericFormat
                                    displayType="text"
                                    value={192}
                                    thousandSeparator={true}
                                />
                            </h3>
                            <GrowShrinkValue
                                className="font-bold"
                                value={data.pageView.growShrink}
                                suffix="%"
                                positiveIcon="+"
                                negativeIcon=""
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-2">Avg. Leads From SDR</div>
                        <div className="flex items-end gap-2">
                            <h3>{289}</h3>
                            <GrowShrinkValue
                                className="font-bold"
                                value={-19}
                                suffix="%"
                                positiveIcon="+"
                                negativeIcon=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Chart
                    type="line"
                    series={data.series}
                    xAxis={data.date}
                    height="330px"
                    customOptions={{
                        legend: { show: false },
                        colors: [COLORS[0], COLORS[7], COLORS[8]],
                    }}
                />
            </div>
        </Card>
    )
}

export default LeadsVolume
