import { useCustomerListStore } from '../store/customerListStore'
import type { Filter, MemberMetric } from '../types'
import type { TableQueries } from '@/@types/common'
import type { KeyedMutator } from 'swr'

type CustomerListMutate = KeyedMutator<unknown>

type UseCustomerListReturn = {
    customerList: MemberMetric[]
    customerListTotal: number
    tableData: TableQueries
    filterData: Filter
    mutate: CustomerListMutate | null
    setMutate: (mutate: CustomerListMutate | null) => void
    setTableData: (payload: TableQueries) => void
    selectedCustomer: Partial<MemberMetric>[]
    setSelectedCustomer: (checked: boolean, customer: MemberMetric) => void
    setSelectAllCustomer: (customer: MemberMetric[]) => void
    setFilterData: (payload: Filter) => void
    setCustomerList: (payload: MemberMetric[]) => void
}

export default function useCustomerList(): UseCustomerListReturn {
    const {
        tableData,
        filterData,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
        customerList,
        setCustomerList,
        mutate,
        setMutate,
    } = useCustomerListStore((state) => state)

    const customerListTotal = customerList.length

    return {
        customerList,
        customerListTotal,
        tableData,
        filterData,
        mutate,
        setMutate,
        setTableData,
        selectedCustomer,
        setSelectedCustomer,
        setSelectAllCustomer,
        setFilterData,
        setCustomerList,
    }
}
