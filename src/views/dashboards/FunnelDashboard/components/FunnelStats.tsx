export type FunnelData = {
    stage: string
    count: number
    trendPercent: number
    potentialRevenueIDR: number
    convertionRatePercent: number
    colorCode: string
}
export default function FunnelStats(props: FunnelData) {
    const {
        stage,
        count,
        trendPercent,
        potentialRevenueIDR,
        convertionRatePercent,
        colorCode,
    } = props
    return (
        <div>
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {stage}
                </h2>
            </div>

            <p className="text-4xl font-extrabold text-gray-900 mb-1 mt-2">
                {count}
            </p>

            <p className="text-md text-gray-600 mb-4 ">
                <span className="font-medium text-gray-800">
                    Rp {potentialRevenueIDR} M
                </span>{' '}
                Potential
            </p>

            <div className="flex justify-between items-center text-sm">
                <div className="text-blue-600 font-semibold">
                    {convertionRatePercent}% Conversion Rate
                </div>
            </div>
        </div>
    )
}
