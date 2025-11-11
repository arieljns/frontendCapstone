import { BadRequestException, Controller, Get, Injectable, Query } from '@nestjs/common'
import { DataSource } from 'typeorm'
import type {
    DealsStats,
    FunnelStage,
    MeetingStats,
    RevenueStats,
    RevenueTrendPoint,
    SentimentStats,
    TargetStats,
    UserDashboardData,
} from '../src/views/dashboards/EcommerceDashboard/types'

type DateRangeQuery = {
    userId: string
    from?: string
    to?: string
}

const FUNNEL_STAGES = [
    'Quotation Sent',
    'Follow Up',
    'Negotiation',
    'Decision Pending',
    'Closed Won',
    'Closed Lost',
]

@Injectable()
export class UserDashboardService {
    constructor(private readonly dataSource: DataSource) {}

    async getRevenueStats(
        userId: string,
        from?: string,
        to?: string,
    ): Promise<RevenueStats> {
        const sql = `
            WITH filtered_tickets AS (
                SELECT kt.id, kt.amount, kt.stage
                FROM kanban_ticket kt
                WHERE kt.owner_id = $1
                  AND kt.closed_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '90 days')
                                        AND COALESCE($3::timestamptz, NOW())
            ),
            ticket_summary AS (
                SELECT
                    COALESCE(SUM(CASE WHEN stage = 'Closed Won' THEN amount END), 0) AS total_revenue,
                    COALESCE(SUM(CASE WHEN stage = 'Closed Lost' THEN amount END), 0) AS lost_revenue,
                    COUNT(CASE WHEN stage = 'Closed Won' THEN 1 END) AS won_deals
                FROM filtered_tickets
            ),
            lead_counts AS (
                SELECT COUNT(DISTINCT v.lead_id) AS total_leads
                FROM validation v
                WHERE v.owner_id = $1
                  AND v.created_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '90 days')
                                        AND COALESCE($3::timestamptz, NOW())
            )
            SELECT
                ticket_summary.total_revenue,
                ticket_summary.lost_revenue,
                CASE
                    WHEN COALESCE(lead_counts.total_leads, 0) = 0 THEN 0
                    ELSE ticket_summary.won_deals::decimal / lead_counts.total_leads
                END AS conversion_rate
            FROM ticket_summary, lead_counts;
        `
        const params = [userId, from ?? null, to ?? null]
        const [row] = await this.dataSource.query(sql, params)

        const trendSql = `
            SELECT
                date_trunc('week', kt.closed_at) AS week_start,
                COALESCE(SUM(CASE WHEN kt.stage = 'Closed Won' THEN kt.amount END), 0) AS total_revenue,
                COALESCE(SUM(CASE WHEN kt.stage = 'Closed Lost' THEN kt.amount END), 0) AS lost_revenue
            FROM kanban_ticket kt
            WHERE kt.owner_id = $1
              AND kt.closed_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '28 days')
                                    AND COALESCE($3::timestamptz, NOW())
            GROUP BY week_start
            ORDER BY week_start DESC
            LIMIT 4;
        `
        const trendRows = await this.dataSource.query(trendSql, params)
        const trend: RevenueTrendPoint[] = trendRows
            .reverse()
            .map((record: Record<string, unknown>, index: number) => ({
                period: `Week ${index + 1}`,
                totalRevenue: Number(record.total_revenue ?? 0),
                lostRevenue: Number(record.lost_revenue ?? 0),
            }))

        return {
            totalRevenue: Number(row?.total_revenue ?? 0),
            lostRevenue: Number(row?.lost_revenue ?? 0),
            conversionRate: Number(row?.conversion_rate ?? 0),
            trend,
        }
    }

    async getTargetStats(userId: string, from?: string, to?: string): Promise<TargetStats> {
        const sql = `
            WITH active_target AS (
                SELECT st.target_amount
                FROM sales_target st
                WHERE st.owner_id = $1
                  AND st.active = true
                ORDER BY st.period_end DESC
                LIMIT 1
            ),
            revenue_achieved AS (
                SELECT COALESCE(SUM(kt.amount), 0) AS achieved_amount
                FROM kanban_ticket kt
                WHERE kt.owner_id = $1
                  AND kt.stage = 'Closed Won'
                  AND kt.closed_at BETWEEN COALESCE($2::timestamptz, date_trunc('month', NOW()))
                                        AND COALESCE($3::timestamptz, NOW())
            )
            SELECT
                COALESCE(active_target.target_amount, 0) AS target_amount,
                revenue_achieved.achieved_amount
            FROM revenue_achieved
            LEFT JOIN active_target ON TRUE;
        `
        const params = [userId, from ?? null, to ?? null]
        const [row] = await this.dataSource.query(sql, params)
        const targetAmount = Number(row?.target_amount ?? 0)
        const achievedAmount = Number(row?.achieved_amount ?? 0)
        return {
            targetAmount,
            achievedAmount,
            remainingAmount: Math.max(targetAmount - achievedAmount, 0),
        }
    }

    async getMeetingStats(userId: string, from?: string, to?: string): Promise<MeetingStats> {
        const sql = `
            WITH meetings AS (
                SELECT bm.id, bm.debrief_completed
                FROM before_meeting bm
                INNER JOIN validation v ON v.id = bm.validation_id
                WHERE bm.owner_id = $1
                  AND bm.scheduled_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '30 days')
                                          AND COALESCE($3::timestamptz, NOW())
            )
            SELECT
                COUNT(*) AS total_meetings,
                SUM(CASE WHEN meetings.debrief_completed THEN 1 ELSE 0 END) AS completed_debriefs,
                SUM(CASE WHEN meetings.debrief_completed THEN 0 ELSE 1 END) AS pending_meetings
            FROM meetings;
        `
        const params = [userId, from ?? null, to ?? null]
        const [row] = await this.dataSource.query(sql, params)
        return {
            totalMeetings: Number(row?.total_meetings ?? 0),
            completedDebriefs: Number(row?.completed_debriefs ?? 0),
            pendingMeetings: Number(row?.pending_meetings ?? 0),
        }
    }

    async getSentimentStats(
        userId: string,
        from?: string,
        to?: string,
    ): Promise<SentimentStats> {
        const sql = `
            SELECT
                SUM(CASE WHEN LOWER(bm.sentiment_label) = 'positive' THEN 1 ELSE 0 END) AS positive,
                SUM(CASE WHEN LOWER(bm.sentiment_label) = 'neutral' THEN 1 ELSE 0 END) AS neutral,
                SUM(CASE WHEN LOWER(bm.sentiment_label) = 'negative' THEN 1 ELSE 0 END) AS negative
            FROM before_meeting bm
            INNER JOIN validation v ON v.id = bm.validation_id
            WHERE bm.owner_id = $1
              AND bm.scheduled_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '30 days')
                                      AND COALESCE($3::timestamptz, NOW());
        `
        const params = [userId, from ?? null, to ?? null]
        const [row] = await this.dataSource.query(sql, params)
        return {
            positive: Number(row?.positive ?? 0),
            neutral: Number(row?.neutral ?? 0),
            negative: Number(row?.negative ?? 0),
        }
    }

    async getFunnelStages(
        userId: string,
        from?: string,
        to?: string,
    ): Promise<FunnelStage[]> {
        const sql = `
            WITH stage_order AS (
                SELECT stage, position
                FROM UNNEST($4::text[]) WITH ORDINALITY AS t(stage, position)
            ),
            pipeline AS (
                SELECT
                    kt.stage,
                    COUNT(DISTINCT kt.id) AS total_deals,
                    COALESCE(SUM(kt.amount), 0) AS total_revenue
                FROM kanban_ticket kt
                INNER JOIN validation v ON v.ticket_id = kt.id AND v.status = 'APPROVED'
                LEFT JOIN before_meeting bm ON bm.validation_id = v.id
                WHERE kt.owner_id = $1
                  AND kt.stage = ANY($4::text[])
                  AND kt.updated_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '90 days')
                                        AND COALESCE($3::timestamptz, NOW())
                GROUP BY kt.stage
            )
            SELECT
                stage_order.stage,
                COALESCE(pipeline.total_deals, 0) AS total_deals,
                COALESCE(pipeline.total_revenue, 0) AS total_revenue
            FROM stage_order
            LEFT JOIN pipeline ON pipeline.stage = stage_order.stage
            ORDER BY stage_order.position;
        `
        const params = [userId, from ?? null, to ?? null, FUNNEL_STAGES]
        const rows = await this.dataSource.query(sql, params)
        return rows.map((row: Record<string, number | string>) => ({
            stage: String(row.stage),
            totalDeals: Number(row.total_deals ?? 0),
            totalRevenue: Number(row.total_revenue ?? 0),
        }))
    }

    async getDealsStats(userId: string, from?: string, to?: string): Promise<DealsStats> {
        const sql = `
            SELECT COUNT(*) AS total_closed_deals
            FROM kanban_ticket kt
            WHERE kt.owner_id = $1
              AND kt.stage = 'Closed Won'
              AND kt.closed_at BETWEEN COALESCE($2::timestamptz, NOW() - interval '90 days')
                                    AND COALESCE($3::timestamptz, NOW());
        `
        const params = [userId, from ?? null, to ?? null]
        const [row] = await this.dataSource.query(sql, params)
        return {
            totalClosedDeals: Number(row?.total_closed_deals ?? 0),
        }
    }

    async getDashboardOverview(
        userId: string,
        from?: string,
        to?: string,
    ): Promise<UserDashboardData> {
        const [revenue, target, meetings, sentiment, funnel, deals] =
            await Promise.all([
                this.getRevenueStats(userId, from, to),
                this.getTargetStats(userId, from, to),
                this.getMeetingStats(userId, from, to),
                this.getSentimentStats(userId, from, to),
                this.getFunnelStages(userId, from, to),
                this.getDealsStats(userId, from, to),
            ])

        return {
            revenue,
            target,
            meetings,
            sentiment,
            funnel,
            deals,
        }
    }
}

@Controller('analytics/user')
export class UserDashboardController {
    constructor(private readonly dashboardService: UserDashboardService) {}

    private ensureUserId(userId?: string) {
        if (!userId) {
            throw new BadRequestException('userId is required')
        }
    }

    @Get()
    getDashboard(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getDashboardOverview(query.userId, query.from, query.to)
    }

    @Get('revenue')
    getRevenue(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getRevenueStats(query.userId, query.from, query.to)
    }

    @Get('target')
    getTarget(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getTargetStats(query.userId, query.from, query.to)
    }

    @Get('meetings')
    getMeetings(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getMeetingStats(query.userId, query.from, query.to)
    }

    @Get('sentiment')
    getSentiment(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getSentimentStats(query.userId, query.from, query.to)
    }

    @Get('funnel')
    getFunnel(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getFunnelStages(query.userId, query.from, query.to)
    }

    @Get('deals')
    getDeals(@Query() query: DateRangeQuery) {
        this.ensureUserId(query.userId)
        return this.dashboardService.getDealsStats(query.userId, query.from, query.to)
    }
}
