import { describe, it, beforeEach, expect } from 'vitest'
import { useOrderFormStore } from './orderFormStore'
import type { Product, ProductOption, SelectedProduct } from '../types'

const makeProduct = (overrides: Partial<Product> = {}): Product => ({
  id: Math.random().toString(36).slice(2),
  name: 'Product',
  productCode: 'P-001',
  img: '',
  price: 100,
  ...overrides,
})

const makeOption = (overrides: Partial<ProductOption> = {}): ProductOption => ({
  label: 'Option',
  img: '',
  value: 'opt-1',
  ...overrides,
})

beforeEach(() => {
  useOrderFormStore.setState(
    { productList: [], productOption: [], selectedProduct: [] },
    true,
  )
})

describe('orders/OrderForm useOrderFormStore', () => {
  it('initial state is empty', () => {
    const s = useOrderFormStore.getState()
    expect(s.productList).toEqual([])
    expect(s.productOption).toEqual([])
    expect(s.selectedProduct).toEqual([])
  })

  it('setProductList sets product list', () => {
    const list = [makeProduct({ id: 'a' }), makeProduct({ id: 'b' })]
    useOrderFormStore.getState().setProductList(list)
    expect(useOrderFormStore.getState().productList).toEqual(list)
  })

  it('setProductOption sets options', () => {
    const options = [makeOption({ value: '1' })]
    useOrderFormStore.getState().setProductOption(options)
    expect(useOrderFormStore.getState().productOption).toEqual(options)
  })

  it('setSelectedProduct sets selected list', () => {
    const selected: SelectedProduct[] = [makeProduct({ id: 'x' })]
    useOrderFormStore.getState().setSelectedProduct(selected)
    expect(useOrderFormStore.getState().selectedProduct).toEqual(selected)
  })
})

