import { describe, it, beforeEach, expect } from 'vitest'
import { useOrderListStore, initialTableData, initialFilterData } from './orderListStore'
import type { AgreementResponse } from '../types'

const makeAgreement = (overrides: Partial<AgreementResponse> = {}): AgreementResponse => ({
  id: 1,
  activationAgreement: '',
  createdAt: new Date().toISOString(),
  decisionMaker: '',
  discountRate: '0',
  excitementLevel: 'Low',
  expiredDate: new Date().toISOString(),
  products: [],
  promo: '',
  sentiment: 'neutral',
  status: 'in_progress',
  termIn: '12',
  totalEmployee: 0,
  mrr: 0,
  totalAmount: 0,
  beforeMeeting: null,
  ...overrides,
})

beforeEach(() => {
  useOrderListStore.setState({
    tableData: initialTableData,
    filterData: initialFilterData,
    orderList: [],
  }, true)
})

describe('orders/OrderList useOrderListStore', () => {
  it('initializes with expected defaults', () => {
    const s = useOrderListStore.getState()
    expect(s.tableData).toEqual(initialTableData)
    expect(s.filterData).toEqual(initialFilterData)
    expect(s.orderList).toEqual([])
  })

  it('setFilterData updates filters', () => {
    const next = { ...initialFilterData, status: 'done' }
    useOrderListStore.getState().setFilterData(next as any)
    expect(useOrderListStore.getState().filterData).toEqual(next)
  })

  it('setTableData updates table pagination/sort', () => {
    const next = { ...initialTableData, pageIndex: 3, pageSize: 50 }
    useOrderListStore.getState().setTableData(next)
    expect(useOrderListStore.getState().tableData).toEqual(next)
  })

  it('setOrderList replaces items', () => {
    const items = [makeAgreement({ id: 10 }), makeAgreement({ id: 11 })]
    useOrderListStore.getState().setOrderList(items)
    expect(useOrderListStore.getState().orderList).toEqual(items)
  })
})

