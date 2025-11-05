import Card from '@/components/ui/Card'
import Chart from '@/components/shared/Chart'
import type { SalesFunnelKanbanStage } from '../types'

type SalesStageComparisonProps = {
    data: SalesFunnelKanbanStage[]
}

const RecentOrder = ({ data }: SalesStageComparisonProps) => {
    const funnelSeries = data.map((stage) => stage.funnel)
    const kanbanSeries = data.map((stage) => stage.kanban)
    const stageLabels = data.map((stage) => stage.stage)

    const conversionRate =
        funnelSeries.length === 0 || funnelSeries[0] === 0
            ? 0
            : Math.round(
                  (kanbanSeries[kanbanSeries.length - 1] /
                      funnelSeries[0]) *
                      100,
              )

    return (
        <Card
            header={{
                content: (
                    <div>
                        <span className="text-sm uppercase text-gray-500 dark:text-gray-400">
                            Pipeline Quality
                        </span>
                        <h4 className="mt-1">Sales Funnel vs Kanban</h4>
                    </div>
                ),
            }}
        >
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">
                        Funnel Start
                    </span>
                    <span className="text-lg font-semibold">
                        {funnelSeries[0] ?? 0} leads
                    </span>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {conversionRate}% conversion
                </div>
                <div>
                    <span className="block text-xs uppercase text-gray-500 dark:text-gray-400">
                        Closed Won
                    </span>
                    <span className="text-lg font-semibold">
                        {kanbanSeries[kanbanSeries.length - 1] ?? 0} deals
                    </span>
                </div>
            </div>
            <Chart
                type="bar"
                height={310}
                series={[
                    { name: 'Funnel', data: funnelSeries },
                    { name: 'Kanban', data: kanbanSeries },
                ]}
                xAxis={stageLabels}
                customOptions={{
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            barHeight: '45%',
                            borderRadius: 6,
                        },
                    },
                    colors: ['#6366f1', '#0ea5e9'],
                    dataLabels: {
                        enabled: true,
                        formatter: (value: number) => value.toString(),
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                            formatter: (value: number) => `${value} deals`,
                        },
                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'left',
                    },
                }}
            />
        </Card>
    )
}

export default RecentOrder
