import { create } from 'zustand'
import type { TableQueries } from '@/@types/common'
import type { Filter, AgreementResponse } from '../types'
import dayjs from 'dayjs'

export const initialTableData: TableQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type OrderListState = {
    tableData: TableQueries
    filterData: Filter
    orderList: AgreementResponse[]
}

type OrderListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setOrderList: (payload: AgreementResponse[]) => void
}

const initialState: OrderListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    orderList: [],
}

export const useOrderListStore = create<OrderListState & OrderListAction>(
    (set) => ({
        ...initialState,
        setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTableData: (payload) => set(() => ({ tableData: payload })),
        setOrderList: (payload) => set(() => ({ orderList: payload })),
    }),
)
