import { describe, it, expect, beforeEach } from 'vitest'
import {
    useCustomerListStore,
    initialTableData,
    initialFilterData,
} from './customerListStore'

// Reset store state between tests
beforeEach(() => {
    const {
        setFilterData,
        setTableData,
        setSelectAllCustomer,
        setCustomerList,
        setMutate,
    } = useCustomerListStore.getState()
    setFilterData(initialFilterData)
    setTableData(initialTableData)
    setSelectAllCustomer([])
    setCustomerList([])
    setMutate(null)
})

describe('useCustomerListStore', () => {
    it('initializes with expected defaults', () => {
        const state = useCustomerListStore.getState()
        expect(state.tableData).toEqual(initialTableData)
        expect(state.filterData).toEqual(initialFilterData)
        expect(state.customerList).toEqual([])
        expect(state.selectedCustomer).toEqual([])
    })

    it('updates filterData via setFilterData', () => {
        const next = { ...initialFilterData, purchasedProducts: 'Laptop' }
        useCustomerListStore.getState().setFilterData(next as any)
        expect(useCustomerListStore.getState().filterData).toEqual(next)
    })

    it('updates tableData via setTableData', () => {
        const next = { ...initialTableData, pageIndex: 2, pageSize: 25 }
        useCustomerListStore.getState().setTableData(next)
        expect(useCustomerListStore.getState().tableData).toEqual(next)
    })

    it('adds and removes selected customers via setSelectedCustomer', () => {
        const customerA = { userId: 'a', name: 'Alice' } as any
        const customerB = { userId: 'b', name: 'Bob' } as any

        // add A
        useCustomerListStore.getState().setSelectedCustomer(true, customerA)
        expect(useCustomerListStore.getState().selectedCustomer).toEqual([
            customerA,
        ])

        // add B
        useCustomerListStore.getState().setSelectedCustomer(true, customerB)
        expect(useCustomerListStore.getState().selectedCustomer).toEqual([
            customerA,
            customerB,
        ])

        // remove A
        useCustomerListStore.getState().setSelectedCustomer(false, customerA)
        expect(useCustomerListStore.getState().selectedCustomer).toEqual([
            customerB,
        ])
    })

    it('replaces full selection via setSelectAllCustomer', () => {
        const list = [
            { userId: '1', name: 'One' },
            { userId: '2', name: 'Two' },
        ] as any
        useCustomerListStore.getState().setSelectAllCustomer(list)
        expect(useCustomerListStore.getState().selectedCustomer).toEqual(list)
    })

    it('updates customerList via setCustomerList', () => {
        const next = [
            {
                userId: '1',
                name: 'Alice',
                email: 'alice@example.com',
                leadCount: 0,
                totalDeals: 0,
                closedWon: 0,
                totalRevenue: 0,
                totalMrr: 0,
                conversionRate: 0,
                initials: 'A',
            },
            {
                userId: '2',
                name: 'Bob',
                email: 'bob@example.com',
                leadCount: 0,
                totalDeals: 0,
                closedWon: 0,
                totalRevenue: 0,
                totalMrr: 0,
                conversionRate: 0,
                initials: 'B',
            },
        ] as any
        useCustomerListStore.getState().setCustomerList(next)
        expect(useCustomerListStore.getState().customerList).toEqual(next)
    })

    it('stores mutate handler via setMutate', () => {
        const mutateFn = () => Promise.resolve()
        useCustomerListStore.getState().setMutate(mutateFn)
        expect(useCustomerListStore.getState().mutate).toBe(mutateFn)
    })
})
