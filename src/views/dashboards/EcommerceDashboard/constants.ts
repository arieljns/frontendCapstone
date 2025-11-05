import type { EcommerceDashboardData } from './types'

export const ecommerceDashboardData: EcommerceDashboardData = {
    revenue: {
        categories: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        revenue: [82000, 90500, 88000, 95200, 102500, 110800],
        forecast: [84000, 92000, 95000, 100000, 106000, 115000],
    },
    meetings: {
        categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        totalMeetings: [34, 28, 41, 39, 45],
        upcomingMeetings: [12, 9, 14, 11, 16],
    },
    salesFunnel: [
        { stage: 'Prospecting', funnel: 140, kanban: 118 },
        { stage: 'Qualified', funnel: 108, kanban: 96 },
        { stage: 'Proposal', funnel: 74, kanban: 68 },
        { stage: 'Negotiation', funnel: 41, kanban: 37 },
        { stage: 'Closed Won', funnel: 26, kanban: 24 },
    ],
    salesTarget: {
        achieved: 790000,
        target: 1000000,
        velocity: [18, 22, 24, 27, 29, 33, 35, 38],
        velocityPeriods: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
    },
    leadsPerformance: [
        { owner: 'Avery', won: 24, lost: 6 },
        { owner: 'Jordan', won: 19, lost: 9 },
        { owner: 'Casey', won: 16, lost: 11 },
        { owner: 'Harper', won: 13, lost: 7 },
        { owner: 'Reese', won: 11, lost: 5 },
    ],
    packages: [
        { label: 'Starter', count: 48 },
        { label: 'Growth', count: 36 },
        { label: 'Enterprise', count: 21 },
        { label: 'Custom', count: 12 },
    ],
    dealsClosed: [
        { month: 'May', count: 16 },
        { month: 'Jun', count: 21 },
        { month: 'Jul', count: 19 },
        { month: 'Aug', count: 24 },
        { month: 'Sep', count: 28 },
        { month: 'Oct', count: 31 },
    ],
    conversion: [
        { channel: 'Outbound', percentage: 12 },
        { channel: 'Inbound', percentage: 23 },
        { channel: 'Referral', percentage: 31 },
        { channel: 'Partnership', percentage: 18 },
        { channel: 'Events', percentage: 9 },
    ],
    meetingSentiment: [
        { sentiment: 'Positive', score: 64 },
        { sentiment: 'Neutral', score: 22 },
        { sentiment: 'Negative', score: 14 },
    ],
}
