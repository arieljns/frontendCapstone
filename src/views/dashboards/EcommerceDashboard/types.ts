export type RevenueChartData = {
    categories: string[]
    revenue: number[]
    forecast: number[]
}

export type MeetingChartData = {
    categories: string[]
    totalMeetings: number[]
    upcomingMeetings: number[]
}

export type SalesFunnelKanbanStage = {
    stage: string
    funnel: number
    kanban: number
}

export type SalesTargetData = {
    achieved: number
    target: number
    velocity: number[]
    velocityPeriods: string[]
}

export type LeadsPerformanceData = {
    owner: string
    won: number
    lost: number
}

export type PackageSelectionData = {
    label: string
    count: number
}

export type DealsClosedData = {
    month: string
    count: number
}

export type ConversionRateData = {
    channel: string
    percentage: number
}

export type MeetingSentimentData = {
    sentiment: 'Positive' | 'Neutral' | 'Negative'
    score: number
}

export type EcommerceDashboardData = {
    revenue: RevenueChartData
    meetings: MeetingChartData
    salesFunnel: SalesFunnelKanbanStage[]
    salesTarget: SalesTargetData
    leadsPerformance: LeadsPerformanceData[]
    packages: PackageSelectionData[]
    dealsClosed: DealsClosedData[]
    conversion: ConversionRateData[]
    meetingSentiment: MeetingSentimentData[]
}
