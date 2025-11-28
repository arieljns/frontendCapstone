export type FunnelSentiment = {
    positive: number
    negative: number
    mixed: number
}

export type FunnelStage = {
    stage: string
    count: number
    trendPercent: number
    potentialRevenueIDR: number
    conversionRatePercent: number
    color: string
    sentiment: FunnelSentiment
}

export const funnelStages: FunnelStage[] = [
    {
        stage: 'Quotation Sent',
        count: 264,
        trendPercent: 5.2,
        potentialRevenueIDR: 1500,
        conversionRatePercent: 68,
        color: '#0EA5E9',
        sentiment: { positive: 10, negative: 3, mixed: 2 },
    },
    {
        stage: 'Follow Up',
        count: 240,
        trendPercent: 3.1,
        potentialRevenueIDR: 1320,
        conversionRatePercent: 61,
        color: '#6366F1',
        sentiment: { positive: 15, negative: 5, mixed: 3 },
    },
    {
        stage: 'Negotiation',
        count: 195,
        trendPercent: -2,
        potentialRevenueIDR: 950,
        conversionRatePercent: 75,
        color: '#F97316',
        sentiment: { positive: 8, negative: 6, mixed: 4 },
    },
    {
        stage: 'Decision Pending',
        count: 164,
        trendPercent: 12.5,
        potentialRevenueIDR: 210,
        conversionRatePercent: 55,
        color: '#10B981',
        sentiment: { positive: 5, negative: 4, mixed: 2 },
    },
    {
        stage: 'Closed Won',
        count: 68,
        trendPercent: 1.1,
        potentialRevenueIDR: 500,
        conversionRatePercent: 100,
        color: '#FACC15',
        sentiment: { positive: 12, negative: 1, mixed: 3 },
    },
    {
        stage: 'Closed Lost',
        count: 42,
        trendPercent: -0.5,
        potentialRevenueIDR: 0,
        conversionRatePercent: 0,
        color: '#F43F5E',
        sentiment: { positive: 2, negative: 7, mixed: 1 },
    },
]
