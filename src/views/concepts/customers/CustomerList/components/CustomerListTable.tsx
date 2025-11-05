import { useCallback, useEffect, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useCustomerList from '../hooks/useCustomerList'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbEye } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { MemberMetric } from '../types'
import type { TableQueries } from '@/@types/common'
import useSWR from 'swr'
import { apiGetTeamMember } from '@/services/CustomersService'

type RawTeamMetric = Partial<MemberMetric> & Record<string, unknown>

type TeamMetricsContainer = {
    data?: RawTeamMetric[]
    list?: RawTeamMetric[]
    members?: RawTeamMetric[]
    results?: RawTeamMetric[]
    items?: RawTeamMetric[]
    total?: number
}

type TeamMetricsResponse = RawTeamMetric[] | TeamMetricsContainer

type TeamMetricsNormalized = {
    members: RawTeamMetric[]
    total: number
}

const responseArrayKeys: (keyof TeamMetricsContainer)[] = [
    'data',
    'list',
    'members',
    'results',
    'items',
]

const buildInitials = (value: string) => {
    const trimmed = value?.trim?.() ?? ''
    if (!trimmed) {
        return 'NA'
    }
    return trimmed
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
}

const parseNumeric = (value: unknown): number | undefined => {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value
    }
    if (typeof value === 'string' && value.trim().length > 0) {
        const parsed = Number(value)
        if (Number.isFinite(parsed)) {
            return parsed
        }
    }
    return undefined
}

const pickNumber = (...values: unknown[]) => {
    for (const value of values) {
        const numeric = parseNumeric(value)
        if (numeric !== undefined) {
            return numeric
        }
    }
    return 0
}

const normalizeMemberMetric = (entry: RawTeamMetric): MemberMetric => {
    const record = entry as Record<string, unknown>
    const user =
        (record.user as Record<string, unknown> | undefined) ?? undefined

    const name =
        (typeof record.name === 'string' && record.name.trim().length > 0
            ? (record.name as string)
            : typeof record.fullName === 'string' &&
                record.fullName.trim().length > 0
              ? (record.fullName as string)
              : typeof user?.name === 'string' && user.name.trim().length > 0
                ? (user.name as string)
                : 'Unknown Member') ?? 'Unknown Member'

    const email =
        (typeof record.email === 'string'
            ? (record.email as string)
            : undefined) ??
        (typeof user?.email === 'string'
            ? (user.email as string)
            : undefined) ??
        ''

    const userIdSource =
        record.userId ?? record.user_id ?? record.id ?? user?.id ?? name

    const initials =
        typeof record.initials === 'string' && record.initials.trim().length > 0
            ? (record.initials as string)
            : buildInitials(name)

    const userUuid =
        (typeof record.userUuid === 'string' &&
        record.userUuid.trim().length > 0
            ? (record.userUuid as string)
            : typeof record.user_uuid === 'string' &&
                record.user_uuid.trim().length > 0
              ? (record.user_uuid as string)
              : typeof record.uuid === 'string' && record.uuid.trim().length > 0
                ? (record.uuid as string)
                : typeof user?.uuid === 'string'
                  ? (user.uuid as string)
                  : undefined) ?? undefined

    return {
        userUuid: userUuid ?? undefined,
        userId: String(userIdSource ?? name),
        email,
        name,
        leadCount: pickNumber(
            record.leadCount,
            record.lead_count,
            record.leads,
            record.totalLeads,
        ),
        totalDeals: pickNumber(
            record.totalDeals,
            record.total_deals,
            record.deals,
            record.totalAmount,
            record.total_amount,
        ),
        closedWon: pickNumber(record.closedWon, record.closed_won, record.won),
        totalRevenue: pickNumber(
            record.totalRevenue,
            record.total_revenue,
            record.revenue,
            record.totalAmount,
            record.total_amount,
        ),
        totalMrr: pickNumber(record.totalMrr, record.total_mrr, record.mrr),
        conversionRate: pickNumber(
            record.conversionRate,
            record.conversion_rate,
            record.conversion,
        ),
        initials,
    }
}

const normalizeTeamMetricsResponse = (
    payload: TeamMetricsResponse | undefined,
): TeamMetricsNormalized => {
    if (!payload) {
        return { members: [] as RawTeamMetric[], total: 0 }
    }
    if (Array.isArray(payload)) {
        return { members: payload, total: payload.length }
    }
    for (const key of responseArrayKeys) {
        const value = payload[key]
        if (Array.isArray(value)) {
            return {
                members: value,
                total:
                    typeof payload.total === 'number'
                        ? payload.total
                        : value.length,
            }
        }
    }
    return {
        members: [] as RawTeamMetric[],
        total: typeof payload.total === 'number' ? payload.total : 0,
    }
}

const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value || 0)

const formatPercentage = (value: number) =>
    `${Math.round((value ?? 0) * 100) / 100}%`

const NameColumn = ({ row }: { row: MemberMetric }) => (
    <div className="flex items-center gap-3">
        <Avatar
            size={40}
            className="bg-primary/10 text-primary font-semibold uppercase"
        >
            {row.initials || row.name.charAt(0)}
        </Avatar>
        <div className="flex flex-col">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
                {row.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
                {row.email}
            </span>
        </div>
    </div>
)

const ActionColumn = ({ onViewDetail }: { onViewDetail: () => void }) => (
    <div className="flex justify-end text-lg gap-1">
        <Tooltip wrapperClass="flex" title="View details">
            <span className="cursor-pointer p-2" onClick={onViewDetail}>
                <TbEye />
            </span>
        </Tooltip>
    </div>
)

const CustomerListTable = () => {
    const navigate = useNavigate()

    const {
        customerList,
        customerListTotal,
        tableData,
        setTableData,
        setSelectAllCustomer,
        setSelectedCustomer,
        selectedCustomer,
        setCustomerList,
        setMutate,
    } = useCustomerList()

    const {
        data: response,
        isLoading,
        mutate,
    } = useSWR<TeamMetricsNormalized>(
        ['/metrics'],
        async () =>
            normalizeTeamMetricsResponse(
                await apiGetTeamMember<TeamMetricsResponse>(),
            ),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    const normalizedMembers = useMemo(
        () =>
            (response?.members ?? []).map((entry) =>
                normalizeMemberMetric(entry),
            ),
        [response],
    )

    useEffect(() => {
        setCustomerList(normalizedMembers)
    }, [normalizedMembers, setCustomerList])

    useEffect(() => {
        if (customerList) {
            console.log(customerList)
        }
    }, [customerList])

    useEffect(() => {
        setMutate(mutate ?? null)
        return () => setMutate(null)
    }, [mutate, setMutate])

    const totalRecords = response?.total ?? customerListTotal

    const handleViewDetails = useCallback(
        (member: MemberMetric) => {
            navigate(`/concepts/members/details/${member.userUuid}`)
        },
        [navigate],
    )

    const columns: ColumnDef<MemberMetric>[] = useMemo(
        () => [
            {
                header: 'Member',
                accessorKey: 'name',
                cell: (props) => <NameColumn row={props.row.original} />,
            },
            {
                header: 'Total Revenue',
                accessorKey: 'totalRevenue',
                cell: (props) => (
                    <span className="font-semibold">
                        {formatCurrency(props.row.original.totalRevenue)}
                    </span>
                ),
            },
            {
                header: 'Leads',
                accessorKey: 'leadCount',
                cell: (props) => (
                    <span className="font-semibold heading-text">
                        {props.row.original.leadCount}
                    </span>
                ),
            },
            {
                header: 'Total Deals',
                accessorKey: 'totalDeals',
                cell: (props) => (
                    <span className="font-semibold heading-text">
                        {props.row.original.totalDeals}
                    </span>
                ),
            },
            {
                header: 'Closed Won',
                accessorKey: 'closedWon',
                cell: (props) => (
                    <span className="font-semibold heading-text">
                        {props.row.original.closedWon}
                    </span>
                ),
            },
            {
                header: 'Total MRR',
                accessorKey: 'totalMrr',
                cell: (props) => (
                    <span className="font-semibold">
                        {formatCurrency(props.row.original.totalMrr)}
                    </span>
                ),
            },
            {
                header: 'Conversion Rate',
                accessorKey: 'conversionRate',
                cell: (props) => (
                    <span className="font-semibold heading-text">
                        {formatPercentage(props.row.original.conversionRate)}
                    </span>
                ),
            },
            {
                header: '',
                id: 'actions',
                meta: { align: 'end' },
                cell: (props) => (
                    <ActionColumn
                        onViewDetail={() =>
                            handleViewDetails(props.row.original)
                        }
                    />
                ),
            },
        ],
        [handleViewDetails],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedCustomer.length > 0) {
            setSelectAllCustomer([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: MemberMetric) => {
        setSelectedCustomer(checked, row)
    }

    const handleAllRowSelect = (
        checked: boolean,
        rows: Row<MemberMetric>[],
    ) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllCustomer(originalRows)
        } else {
            setSelectAllCustomer([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={customerList}
            noData={!isLoading && customerList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: totalRecords,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedCustomer.some(
                    (selected) => selected.userId === row.userId,
                )
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default CustomerListTable
