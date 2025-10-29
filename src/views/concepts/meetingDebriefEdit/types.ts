import type { Control, FieldErrors } from 'react-hook-form'

export type Product = {
    id: string
    name: string
    productCode: string
    img: string
    price: number
}

export type Products = Product[]

export type ProductTermIn = {
    termIn: number
    discountRate: number
    totalEmployee: number
}

export type GetProductListResponse = {
    list: Product[]
    total: number
}

export type ProductOption = {
    label: string
    img: string
    value: string
}

export type SelectedProduct = Product

export type CustomerDetailsFields = {
    sentiment: string
    status: string
    excitementLevel: string
}

export type BillingAddressFields = {
    promo: string
    decisionMaker: string
    expiredDate: Date
    activationAgreement: string
}

export type ParamField = {
    beforeMeeting: number
}

export type Revenue = {
    totalAmount: number
    mrr: number
}

type BaseOrderFormSchema = CustomerDetailsFields &
    BillingAddressFields &
    ParamField &
    Revenue &
    ProductTermIn & {
        products: Products[]
    }

export type OrderFormSchema = BaseOrderFormSchema
export type FormSectionBaseProps = {
    control: Control<OrderFormSchema>
    errors: FieldErrors<OrderFormSchema>
}
