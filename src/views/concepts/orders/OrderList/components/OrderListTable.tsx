import { useEffect, useMemo } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import useOrderlist from '../hooks/useOrderlist'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router-dom'
import { TbTrash, TbEye } from 'react-icons/tb'
import dayjs from 'dayjs'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import useSWR from 'swr'
import { apiGetMeetingDebrief } from '@/services/DashboardService'
import { AgreementResponse } from '../types'
import { useOrderListStore } from '../store/orderListStore'
import useOrderList from '../hooks/useOrderlist'

const OrderColumn = ({ row }: { row: AgreementResponse }) => {
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/concepts/meeting-debrief-edit/${row.id}`)
    }

    return (
        <span
            className="cursor-pointer font-bold heading-text hover:text-primary"
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const ActionColumn = ({ row }: { row: AgreementResponse }) => {
    const navigate = useNavigate()

    const onDelete = () => {}

    const onView = () => {
        navigate(`/concepts/orders/order-details/${row.id}`)
    }

    return (
        <div className="flex justify-end text-lg gap-1">
            <Tooltip wrapperClass="flex" title="View">
                <span className={`cursor-pointer p-2`} onClick={onView}>
                    <TbEye />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <TbTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const OrderListTable = () => {
    const { setOrderList, tableData, setTableData, orderList } =
        useOrderListStore()
    const { orderListTotal } = useOrderList()
    const { data, error, isLoading } = useSWR<AgreementResponse[]>(
        ['/after'],
        () => apiGetMeetingDebrief<AgreementResponse[]>(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )
    useEffect(() => {
        if (data) {
            setOrderList(data)
        }
    }, [data, setOrderList, error])

    const columns: ColumnDef<AgreementResponse>[] = useMemo(
        () => [
            {
                header: 'id',
                accessorKey: 'id',
                cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                header: 'Company Name',
                accessorKey: 'customer',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.beforeMeeting?.name}
                        </span>
                    )
                },
            },
            {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {dayjs.unix(row.expiredDate).format('DD/MM/YYYY')}
                        </span>
                    )
                },
            },
            {
                header: 'Head Count',
                accessorKey: 'headCount',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">
                            {row.totalEmployee}
                        </span>
                    )
                },
            },
            {
                header: 'Sentiment',
                accessorKey: 'sentiment',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="font-semibold">{row.sentiment}</span>
                    )
                },
            },
            {
                header: 'MRR',
                accessorKey: 'paymentMehod',
                cell: (props) => {
                    const mrrAmount = props.row.original.mrr
                    const formatted = new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                    }).format(mrrAmount)
                    props.row.original
                    return (
                        <span className="flex items-center gap-2">
                            <span className="font-semibold">{formatted}</span>
                        </span>
                    )
                },
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
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

    return (
        <DataTable
            columns={columns}
            data={data as unknown[]}
            noData={!isLoading && data.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: orderListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
        />
    )
}

export default OrderListTable
