import type {
    DealsStats,
    FunnelStage,
    MeetingStats,
    RevenueStats,
    RevenueTrendPoint,
    SentimentStats,
    TargetStats,
    UserDashboardData,
} from './types'

const mockRevenueTrend: RevenueTrendPoint[] = [
    { period: 'Week 1', totalRevenue: 142000000, lostRevenue: 32000000 },
    { period: 'Week 2', totalRevenue: 151000000, lostRevenue: 28000000 },
    { period: 'Week 3', totalRevenue: 163000000, lostRevenue: 35000000 },
    { period: 'Week 4', totalRevenue: 170000000, lostRevenue: 31000000 },
]

const mockRevenue: RevenueStats = {
    totalRevenue: mockRevenueTrend.reduce((sum, point) => sum + point.totalRevenue, 0),
    lostRevenue: mockRevenueTrend.reduce((sum, point) => sum + point.lostRevenue, 0),
    conversionRate: 0.34,
    trend: mockRevenueTrend,
}

const mockTarget: TargetStats = {
    targetAmount: 1200000000,
    achievedAmount: 815000000,
    remainingAmount: 385000000,
}

const mockMeetings: MeetingStats = {
    totalMeetings: 58,
    completedDebriefs: 41,
    pendingMeetings: 17,
}

const mockSentiment: SentimentStats = {
    positive: 34,
    neutral: 15,
    negative: 9,
}

const mockFunnel: FunnelStage[] = [
    { stage: 'Quotation Sent', totalDeals: 36, totalRevenue: 420000000 },
    { stage: 'Follow Up', totalDeals: 31, totalRevenue: 385000000 },
    { stage: 'Negotiation', totalDeals: 22, totalRevenue: 310000000 },
    { stage: 'Decision Pending', totalDeals: 15, totalRevenue: 255000000 },
    { stage: 'Closed Won', totalDeals: 12, totalRevenue: 215000000 },
    { stage: 'Closed Lost', totalDeals: 9, totalRevenue: 160000000 },
]

const mockDeals: DealsStats = {
    totalClosedDeals: 24,
}

export const mockDashboardData: UserDashboardData = {
    revenue: mockRevenue,
    target: mockTarget,
    meetings: mockMeetings,
    sentiment: mockSentiment,
    funnel: mockFunnel,
    deals: mockDeals,
}
