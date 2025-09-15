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

export type PaymentType = 'creditOrDebitCard' | 'bankTransfer' | ''

export type GetPaymentMethodFields<T extends PaymentType> =
    T extends 'creditOrDebitCard'
        ? {
              cardHolderName: string
              ccNumber: string
              cardExpiry: string
              code: string
          }
        : T extends 'bankTransfer'
          ? {
                accountHolderName: string
                bankName: string
                accountNumber: string
            }
          : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            {}

export interface PaymentMethodFields {
    paymentMethod: PaymentType
}

type BaseOrderFormSchema = CustomerDetailsFields &
    BillingAddressFields &
    ProductTermIn &
    PaymentMethodFields & {
        products: Products[]
    }

export type OrderFormSchema = BaseOrderFormSchema &
    (
        | GetPaymentMethodFields<'creditOrDebitCard'>
        | GetPaymentMethodFields<'bankTransfer'>
    )

export type FormSectionBaseProps = {
    control: Control<OrderFormSchema>
    errors: FieldErrors<OrderFormSchema>
}
