export interface RevenueTrendPoint {
    period: string
    totalRevenue: number
    lostRevenue: number
}

export interface RevenueStats {
    totalRevenue: number
    lostRevenue: number
    conversionRate: number
    trend?: RevenueTrendPoint[]
}

export interface TargetStats {
    targetAmount: number
    achievedAmount: number
    remainingAmount: number
}

export interface MeetingStats {
    totalMeetings: number
    completedDebriefs: number
    pendingMeetings: number
}

export interface SentimentStats {
    positive: number
    neutral: number
    negative: number
}

export interface FunnelStage {
    stage: string
    totalDeals: number
    totalRevenue: number
}

export interface DealsStats {
    totalClosedDeals: number
}

export interface UserDashboardData {
    revenue: RevenueStats
    target: TargetStats
    meetings: MeetingStats
    sentiment: SentimentStats
    funnel: FunnelStage[]
    deals: DealsStats
}
