import type { FunnelStage } from '../mock'

type FunnelStatsProps = {
    stage: FunnelStage
}

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

const FunnelStats = ({ stage }: FunnelStatsProps) => {
    const trendPositive = stage.trendPercent >= 0
    const trendColor = trendPositive
        ? 'text-emerald-600'
        : 'text-rose-600'
    const trendIcon = trendPositive ? '▲' : '▼'

    return (
        <div className="ml-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {stage.stage}
                </h2>
                <span className={`text-xs font-semibold ${trendColor}`}>
                    {trendIcon} {Math.abs(stage.trendPercent).toFixed(1)}%
                </span>
            </div>

            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                {stage.count.toLocaleString('id-ID')}
                <span className="ml-1 text-sm font-medium text-gray-500">
                    deals
                </span>
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {currencyFormatter.format(stage.potentialRevenueIDR * 1_000_000)}{' '}
                potential
            </p>

            <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                    <span>Conversion</span>
                    <span>{stage.conversionRatePercent}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                        className="h-2 rounded-full"
                        style={{
                            width: `${stage.conversionRatePercent}%`,
                            backgroundColor: stage.color,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default FunnelStats
