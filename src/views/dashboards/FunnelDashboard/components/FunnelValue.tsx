import { Card } from '@/components/ui'
import FunnelStats from './FunnelStats'

const SalesFunnelCardData = [
    {
        stage: 'Quotation Sent',
        count: 90,
        trendPercent: 5.2, // Positive trend: Green (use "-" for negative)
        potentialRevenueIDR: 1500, // Rp 1.500.000.000
        conversionRatePercent: 68,
        colorCode: 'blue', // For border-t-blue-500
    },
      {
        stage: 'Follow Up',
        count: 90,
        trendPercent: 5.2, // Positive trend: Green (use "-" for negative)
        potentialRevenueIDR: 150, // Rp 1.500.000.000
        conversionRatePercent: 68,
        colorCode: 'blue', // For border-t-blue-500
    },
    {
        stage: 'Negotiation',
        count: 10,
        trendPercent: -2, // Negative trend: Red
        potentialRevenueIDR: 950, // Rp 950.000.000
        conversionRatePercent: 75,
        colorCode: 'green', // For border-t-green-500
    },
    {
        stage: 'Decision Pending',
        count: 109,
        trendPercent: 12.5, // Positive trend
        potentialRevenueIDR: 210, // Rp 2.100.000.000
        conversionRatePercent: 55,
        colorCode: 'purple', // For border-t-purple-500
    },
    {
        stage: 'Closed Won',
        count: 109,
        trendPercent: 1.1, // Positive trend
        potentialRevenueIDR: 500, // Rp 500.000.000
        conversionRatePercent: 100, // Conversion rate from prior stage is irrelevant here
        colorCode: 'emerald', // For border-t-emerald-500
    },
    {
        stage: 'Closed Lost',
        count: 109,
        trendPercent: -0.5, // Negative trend
        potentialRevenueIDR: 0, // No revenue to track
        conversionRatePercent: 0, // Conversion rate from prior stage is irrelevant here
        colorCode: 'red', // For border-t-red-500
    },
]

export default function FunnelValue() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-6  rounded-2xl mt-4">
            {SalesFunnelCardData.map((funnel, index) => {
                return (
                    <Card key={index}>
                        <FunnelStats
                            stage={funnel.stage}
                            count={funnel.count}
                            trendPercent={funnel.trendPercent}
                            potentialRevenueIDR={funnel.potentialRevenueIDR}
                            convertionRatePercent={funnel.conversionRatePercent}
                            colorCode={funnel.colorCode}
                        />
                    </Card>
                )
            })}
        </div>
    )
}
