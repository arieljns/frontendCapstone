/* @vitest-environment jsdom */
import React, { useEffect } from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { createRoot } from 'react-dom/client'
import useCustomerList from './useCustomerList'
import {
    useCustomerListStore,
    initialFilterData,
    initialTableData,
} from '../store/customerListStore'
import type { MemberMetric } from '../types'

function renderHook<T>(hook: () => T): Promise<T> {
    return new Promise((resolve) => {
        const container = document.createElement('div')
        document.body.appendChild(container)
        const root = createRoot(container)

        const Harness: React.FC = () => {
            const result = hook()
            useEffect(() => {
                resolve(result)
            }, [result])
            return null
        }
        root.render(<Harness />)
    })
}

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

describe('useCustomerList hook', () => {
    it('returns customer list data and store bindings', async () => {
        const members: MemberMetric[] = [
            {
                userId: '1',
                email: 'alice@example.com',
                name: 'Alice Johnson',
                leadCount: 3,
                totalDeals: 10,
                closedWon: 5,
                totalRevenue: 25000,
                totalMrr: 3000,
                conversionRate: 32.5,
                initials: 'AJ',
            },
            {
                userId: '2',
                email: 'bob@example.com',
                name: 'Bob Smith',
                leadCount: 2,
                totalDeals: 6,
                closedWon: 2,
                totalRevenue: 12000,
                totalMrr: 1800,
                conversionRate: 24.1,
                initials: 'BS',
            },
        ]
        useCustomerListStore.getState().setCustomerList(members)

        const res = await renderHook(() => useCustomerList())

        expect(Array.isArray(res.customerList)).toBe(true)
        expect(res.customerList.length).toBe(2)
        expect(res.customerListTotal).toBe(2)
        expect(res.mutate).toBeNull()
        expect(typeof res.setMutate).toBe('function')

        expect(typeof res.setTableData).toBe('function')
        expect(typeof res.setFilterData).toBe('function')
        expect(typeof res.setSelectedCustomer).toBe('function')
        expect(typeof res.setSelectAllCustomer).toBe('function')
        expect(typeof res.setCustomerList).toBe('function')
    })
})
