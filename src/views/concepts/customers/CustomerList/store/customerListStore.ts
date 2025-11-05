import { create } from 'zustand'
import type { KeyedMutator } from 'swr'
import type { TableQueries } from '@/@types/common'
import type { Filter, MemberMetric } from '../types'

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
    purchasedProducts: '',
    purchaseChannel: [
        'Retail Stores',
        'Online Retailers',
        'Resellers',
        'Mobile Apps',
        'Direct Sales',
    ],
}

export type CustomersListState = {
    tableData: TableQueries
    filterData: Filter
    customerList: MemberMetric[]
    selectedCustomer: Partial<MemberMetric>[]
    mutate: KeyedMutator<unknown> | null
}

type CustomersListAction = {
    setFilterData: (payload: Filter) => void
    setTableData: (payload: TableQueries) => void
    setCustomerList: (payload: MemberMetric[]) => void
    setSelectedCustomer: (checked: boolean, customer: MemberMetric) => void
    setSelectAllCustomer: (customer: MemberMetric[]) => void
    setMutate: (mutate: KeyedMutator<unknown> | null) => void
}

const initialState: CustomersListState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    customerList: [],
    selectedCustomer: [],
    mutate: null,
}

export const useCustomerListStore = create<
    CustomersListState & CustomersListAction
>((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setCustomerList: (payload) => set(() => ({ customerList: payload })),
    setSelectedCustomer: (checked, row) =>
        set((state) => {
            const prevData = state.selectedCustomer
            if (checked) {
                return { selectedCustomer: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some(
                        (prevCustomer) => row.userId === prevCustomer.userId,
                    )
                ) {
                    return {
                        selectedCustomer: prevData.filter(
                            (prevCustomer) =>
                                prevCustomer.userId !== row.userId,
                        ),
                    }
                }
                return { selectedCustomer: prevData }
            }
        }),
    setSelectAllCustomer: (row) => set(() => ({ selectedCustomer: row })),
    setMutate: (mutate) => set(() => ({ mutate })),
}))
