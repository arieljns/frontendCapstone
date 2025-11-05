import { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR, { useSWRConfig } from 'swr'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Progress from '@/components/ui/Progress'
import Button from '@/components/ui/Button'
import Loading from '@/components/shared/Loading'
import Chart from '@/components/shared/Chart'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {
    apiDeleteTeamMember,
    apiGetTeamMemberById,
} from '@/services/CustomersService'
import type { MemberMetric } from '@/views/concepts/customers/CustomerList/types'
import type { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import {
    TbTargetArrow,
    TbTrendingUp,
    TbChartInfographic,
    TbUsersGroup,
} from 'react-icons/tb'
import type { ReactNode } from 'react'

type PerformancePoint = {
    month: string
    revenue: number
    mrr: number
    leads: number
    winRate: number
}

type KpiCard = {
    title: string
    value: string
    change: number
    helper: string
    icon: ReactNode
}

const FALLBACK_MEMBER: MemberMetric = {
    userUuid: 'fallback-member-uuid',
    userId: 'fallback-member',
    email: 'rev.ari@indigo.io',
    name: 'Revina Arifin',
    leadCount: 56,
    totalDeals: 34,
    closedWon: 22,
    totalRevenue: 812_000_000,
    totalMrr: 92_000_000,
    conversionRate: 39.5,
    initials: 'RA',
}

const FALLBACK_PERFORMANCE: PerformancePoint[] = [
    {
        month: 'May',
        revenue: 540_000_000,
        mrr: 68_000_000,
        leads: 24,
        winRate: 37.2,
    },
    {
        month: 'Jun',
        revenue: 586_000_000,
        mrr: 71_500_000,
        leads: 27,
        winRate: 38.1,
    },
    {
        month: 'Jul',
        revenue: 628_000_000,
        mrr: 74_000_000,
        leads: 29,
        winRate: 38.7,
    },
    {
        month: 'Aug',
        revenue: 672_000_000,
        mrr: 79_000_000,
        leads: 32,
        winRate: 39.4,
    },
    {
        month: 'Sep',
        revenue: 718_000_000,
        mrr: 84_000_000,
        leads: 34,
        winRate: 40.1,
    },
    {
        month: 'Oct',
        revenue: 756_000_000,
        mrr: 88_000_000,
        leads: 36,
        winRate: 40.7,
    },
]

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
})

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})
const percentFormatter = (value: number) =>
    `${Number.isFinite(value) ? value.toFixed(1) : '0.0'}%`

const formatNumber = (value: number) =>
    numberFormatter.format(Math.round(value))
const formatCurrency = (value: number) =>
    currencyFormatter.format(Math.round(value))

const safeNumber = (value: unknown, fallback: number) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value
    }
    if (typeof value === 'string') {
        const normalized = Number(value.replace(/[^\d.-]/g, ''))
        if (Number.isFinite(normalized)) {
            return normalized
        }
    }
    return fallback
}

const normalizeMember = (raw?: Partial<MemberMetric>): MemberMetric => {
    if (!raw) {
        return FALLBACK_MEMBER
    }

    return {
        userUuid: raw.userUuid ?? FALLBACK_MEMBER.userUuid,
        userId: raw.userId ?? FALLBACK_MEMBER.userId,
        email: raw.email ?? FALLBACK_MEMBER.email,
        name:
            raw.name && raw.name.trim().length > 0
                ? raw.name
                : FALLBACK_MEMBER.name,
        leadCount: safeNumber(raw.leadCount, FALLBACK_MEMBER.leadCount),
        totalDeals: safeNumber(raw.totalDeals, FALLBACK_MEMBER.totalDeals),
        closedWon: safeNumber(raw.closedWon, FALLBACK_MEMBER.closedWon),
        totalRevenue: safeNumber(
            raw.totalRevenue,
            FALLBACK_MEMBER.totalRevenue,
        ),
        totalMrr: safeNumber(raw.totalMrr, FALLBACK_MEMBER.totalMrr),
        conversionRate: safeNumber(
            raw.conversionRate,
            FALLBACK_MEMBER.conversionRate,
        ),
        initials:
            raw.initials && raw.initials.trim().length > 0
                ? raw.initials
                : FALLBACK_MEMBER.initials,
    }
}

const normalizePerformance = (
    points: PerformancePoint[],
    member: MemberMetric,
) => {
    const revenueScale =
        member.totalRevenue > 0
            ? member.totalRevenue / FALLBACK_MEMBER.totalRevenue
            : 1
    const mrrScale =
        member.totalMrr > 0 ? member.totalMrr / FALLBACK_MEMBER.totalMrr : 1
    const leadScale =
        member.leadCount > 0 ? member.leadCount / FALLBACK_MEMBER.leadCount : 1
    const baseWinRate =
        member.conversionRate > 0
            ? member.conversionRate
            : FALLBACK_MEMBER.conversionRate

    const lastIndex = points.length - 1

    return points.map((point, index) => {
        const winRateAdjustment = Number(
            Math.max(
                5,
                Math.min(95, baseWinRate + (index - lastIndex) * 0.8),
            ).toFixed(1),
        )

        return {
            month: point.month,
            revenue: Math.round(point.revenue * revenueScale),
            mrr: Math.round(point.mrr * mrrScale),
            leads: Math.max(1, Math.round(point.leads * leadScale)),
            winRate: winRateAdjustment,
        }
    })
}

const MembersDetails = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { mutate } = useSWRConfig()

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const normalizedId = id?.trim() ?? ''

    const swrKey = normalizedId
        ? ['analytics/team-metrics', normalizedId]
        : null

    const { data, isLoading } = useSWR<
        MemberMetric | MemberMetric[] | null | undefined
    >(
        swrKey,
        () =>
            apiGetTeamMemberById<
                MemberMetric | MemberMetric[] | null | undefined
            >(normalizedId),
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false,
        },
    )

    const resolvedMember = useMemo<Partial<MemberMetric> | undefined>(() => {
        if (!data) {
            return undefined
        }

        if (Array.isArray(data)) {
            if (!data.length) {
                return undefined
            }

            if (!normalizedId) {
                return data[0]
            }

            const targetId = normalizedId.toLowerCase()

            const match = data.find((item) => {
                if (!item) {
                    return false
                }

                const candidate = item as Partial<MemberMetric>

                const candidateUserId =
                    typeof candidate.userId === 'string'
                        ? candidate.userId.toLowerCase()
                        : undefined
                const candidateEmail =
                    typeof candidate.email === 'string'
                        ? candidate.email.toLowerCase()
                        : undefined

                return (
                    candidateUserId === targetId || candidateEmail === targetId
                )
            })

            return match ?? data[0]
        }
        return data
    }, [data, normalizedId])

    const member = useMemo(
        () => normalizeMember(resolvedMember),
        [resolvedMember],
    )

    const handleOpenDeleteDialog = useCallback(() => {
        if (!normalizedId) {
            return
        }
        setDeleteDialogOpen(true)
    }, [normalizedId])

    const handleCloseDeleteDialog = useCallback(() => {
        if (isDeleting) {
            return
        }
        setDeleteDialogOpen(false)
    }, [isDeleting])

    const handleConfirmDelete = useCallback(async () => {
        if (!normalizedId) {
            return
        }
        try {
            setIsDeleting(true)
            await apiDeleteTeamMember(normalizedId)
            setDeleteDialogOpen(false)
            toast.push(
                <Notification type="success">
                    Member profile removed
                </Notification>,
                { placement: 'top-center' },
            )
            await mutate(['/metrics'])
            await mutate(['analytics/team-metrics', normalizedId], null, {
                revalidate: false,
            })
            navigate('/concepts/members')
        } catch (error) {
            console.error('Failed to delete member', error)
            toast.push(
                <Notification type="danger">
                    Unable to delete this member. Please try again.
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsDeleting(false)
        }
    }, [mutate, navigate, normalizedId])

    const performance = useMemo(
        () => normalizePerformance(FALLBACK_PERFORMANCE, member),
        [member],
    )

    const averageDealValue = useMemo(() => {
        if (!member.totalDeals) {
            return 0
        }
        return member.totalRevenue / member.totalDeals
    }, [member.totalRevenue, member.totalDeals])

    const chartSeries: ApexAxisChartSeries = useMemo(
        () => [
            {
                name: 'Revenue',
                data: performance.map((point) => point.revenue),
            },
            {
                name: 'Monthly Recurring Revenue',
                data: performance.map((point) => point.mrr),
            },
        ],
        [performance],
    )

    const chartOptions = useMemo<ApexOptions>(
        () => ({
            stroke: {
                width: 3,
                curve: 'smooth',
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.8,
                    stops: [0, 80, 100],
                },
            },
            yaxis: {
                labels: {
                    formatter: (value: number) => formatCurrency(value),
                },
            },
            tooltip: {
                shared: true,
                y: {
                    formatter: (value: number) => formatCurrency(value),
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            },
        }),
        [],
    )

    const kpis: KpiCard[] = useMemo(
        () => [
            {
                title: 'Leads generated',
                value: formatNumber(member.leadCount),
                change: 14.2,
                helper: 'vs. last quarter',
                icon: <TbUsersGroup />,
            },
            {
                title: 'Deals won',
                value: formatNumber(member.closedWon),
                change: 11.4,
                helper: 'win rate trending up',
                icon: <TbTargetArrow />,
            },
            {
                title: 'Revenue impact',
                value: formatCurrency(member.totalRevenue),
                change: 18.6,
                helper: 'pipeline conversion',
                icon: <TbChartInfographic />,
            },
            {
                title: 'Conversion rate',
                value: percentFormatter(member.conversionRate),
                change: 3.1,
                helper: 'month-over-month',
                icon: <TbTrendingUp />,
            },
        ],
        [member],
    )

    const goalTracking = useMemo(() => {
        const revenueProgress = Math.min(
            100,
            Math.round(
                (member.totalRevenue / (member.totalRevenue + 240_000_000)) *
                    100,
            ),
        )
        const mrrProgress = Math.min(
            100,
            Math.round(
                (member.totalMrr / (member.totalMrr + 28_000_000)) * 100,
            ),
        )
        const enablementProgress = Math.min(
            100,
            Math.round((member.leadCount / 64) * 100),
        )

        return [
            {
                label: 'Quarterly revenue target',
                percent: revenueProgress,
                helper: `${formatCurrency(member.totalRevenue)} achieved`,
            },
            {
                label: 'MRR expansion goal',
                percent: mrrProgress,
                helper: `${formatCurrency(member.totalMrr)} in active MRR`,
            },
            {
                label: 'Enablement & follow-up SLAs',
                percent: enablementProgress,
                helper: `${formatNumber(member.leadCount)} leads touched`,
            },
        ]
    }, [member])

    const pipelineCoverage = useMemo(() => {
        const coverage =
            member.closedWon > 0
                ? member.leadCount / member.closedWon
                : member.leadCount > 0
                  ? member.leadCount / 4
                  : 1.6
        return Number(coverage.toFixed(1))
    }, [member.leadCount, member.closedWon])

    const highlights = useMemo(
        () => [
            {
                title: 'Aerodyne renewal closed',
                meta: `${formatCurrency(Math.round(member.totalRevenue * 0.18))} - 2 days ago`,
            },
            {
                title: 'Enterprise discovery workshops',
                meta: '5 sessions delivered - High CSAT (4.8/5)',
            },
            {
                title: 'Lead response SLA',
                meta: 'Median 6h first response - Target 8h',
            },
        ],
        [member.totalRevenue],
    )

    const bestMonth = useMemo(() => {
        if (!Array.isArray(performance) || performance.length === 0) return null

        return performance.reduce(
            (acc, point) => (point.revenue > acc.revenue ? point : acc),
            performance[0],
        )
    }, [performance])

    const trailingWinRate = useMemo(() => {
        if (!performance.length) {
            return 0
        }
        const total = performance.reduce((sum, point) => sum + point.winRate, 0)
        return Number((total / performance.length).toFixed(1))
    }, [performance])

    return (
        <>
            <Loading loading={isLoading}>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <Card className="xl:col-span-2">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar size={64}>
                                            {member.initials ||
                                                (member.name &&
                                                member.name.length > 0
                                                    ? member.name[0]
                                                    : '?')}
                                        </Avatar>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {member.email}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <Tag className="bg-emerald-100 border-emerald-100 text-emerald-700">
                                                    Top Performer
                                                </Tag>
                                                <Tag className="bg-sky-100 border-sky-100 text-sky-700">
                                                    Strategic Accounts
                                                </Tag>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-full lg:max-w-xl">
                                    <div className="flex justify-end">
                                        <Button
                                            variant="default"
                                            className="bg-red-600 text-white hover:bg-red-700 border-transparent"
                                            size="sm"
                                            loading={isDeleting}
                                            disabled={
                                                !normalizedId || isDeleting
                                            }
                                            onClick={handleOpenDeleteDialog}
                                        >
                                            Delete member
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                            <div className="text-xs uppercase tracking-wide text-gray-500">
                                                Leads
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                                                {formatNumber(member.leadCount)}
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                            <div className="text-xs uppercase tracking-wide text-gray-500">
                                                Won deals
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                                                {formatNumber(member.closedWon)}
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                            <div className="text-xs uppercase tracking-wide text-gray-500">
                                                Conversion
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                                                {percentFormatter(
                                                    member.conversionRate,
                                                )}
                                            </div>
                                        </div>
                                        <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                            <div className="text-xs uppercase tracking-wide text-gray-500">
                                                Avg deal value
                                            </div>
                                            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                                                {formatCurrency(
                                                    averageDealValue,
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                Highlights
                            </h4>
                            <div className="mt-4 flex flex-col gap-3">
                                {highlights.map((item) => (
                                    <div
                                        key={item.title}
                                        className="border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-3"
                                    >
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {item.title}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {item.meta}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {kpis.map((item) => (
                            <Card key={item.title} className="h-full">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500">
                                            {item.title}
                                        </div>
                                        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                            {item.value}
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center justify-center text-xl text-indigo-600 bg-indigo-50 dark:bg-indigo-500/15 dark:text-indigo-200 rounded-full p-2">
                                        {item.icon}
                                    </span>
                                </div>
                                <div className="mt-3 text-xs">
                                    <span
                                        className={`font-medium ${
                                            item.change >= 0
                                                ? 'text-emerald-600'
                                                : 'text-rose-600'
                                        }`}
                                    >
                                        {item.change >= 0 ? '+' : ''}
                                        {item.change.toFixed(1)}%
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        {item.helper}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <Card className="xl:col-span-2">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                                <div>
                                    <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                        Revenue trajectory
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        Trailing six months performance
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <Chart
                                    type="area"
                                    height={320}
                                    series={chartSeries}
                                    xAxis={performance.map(
                                        (point) => point.month,
                                    )}
                                    customOptions={chartOptions}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                    <div className="text-xs text-gray-500">
                                        Best month
                                    </div>
                                    <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                        {bestMonth.month}{' '}
                                        <span className="block text-sm font-normal text-gray-500">
                                            {formatCurrency(bestMonth.revenue)}
                                        </span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                    <div className="text-xs text-gray-500">
                                        Avg win rate
                                    </div>
                                    <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                        {percentFormatter(trailingWinRate)}
                                    </div>
                                </div>
                                <div className="rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                    <div className="text-xs text-gray-500">
                                        Leads per month
                                    </div>
                                    <div className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-2">
                                        {formatNumber(
                                            Math.round(
                                                performance.reduce(
                                                    (sum, point) =>
                                                        sum + point.leads,
                                                    0,
                                                ) / performance.length,
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="h-full">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                                Goal tracking
                            </h4>
                            <div className="mt-5 space-y-5">
                                {goalTracking.map((item) => (
                                    <div key={item.label}>
                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>{item.label}</span>
                                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                                                {item.percent}%
                                            </span>
                                        </div>
                                        <Progress
                                            percent={item.percent}
                                            showInfo={false}
                                        />
                                        <div className="text-xs text-gray-500 mt-2">
                                            {item.helper}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3">
                                <div className="text-xs text-gray-500">
                                    Pipeline coverage
                                </div>
                                <div className="flex items-baseline gap-2 mt-2">
                                    <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                        {pipelineCoverage}x
                                    </span>
                                    <span className="text-xs font-medium text-emerald-600">
                                        Healthy
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                    Based on current open opportunities and
                                    quarterly quota pacing.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </Loading>
            <ConfirmDialog
                isOpen={deleteDialogOpen}
                type="danger"
                title="Delete member"
                onClose={handleCloseDeleteDialog}
                onRequestClose={handleCloseDeleteDialog}
                onCancel={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                confirmText="Delete"
                confirmButtonProps={{
                    loading: isDeleting,
                    className:
                        'bg-red-600 text-white hover:bg-red-700 border-transparent',
                }}
            >
                <p>
                    Are you sure you want to delete this team member? This
                    action cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default MembersDetails
