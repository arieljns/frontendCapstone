export type Order = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

export type Orders = Order[]

export type Filter = {
    date: [Date, Date]
    status: string
    paymentMethod: string[]
}

export type GetOrdersResponse = {
    list: Orders
    total: number
}

export type Product = {
    id: string
    img: string
    name: string
    price: number
    productCode: string
}

export type AgreementResponse = {
    id: number
    activationAgreement: string
    createdAt: string
    decisionMaker: string
    discountRate: string
    excitementLevel: 'Low' | 'Medium' | 'High' | string
    expiredDate: string
    products: Product[]
    promo: string
    sentiment: 'positive' | 'neutral' | 'negative' | string
    status: 'in_progress' | 'done' | 'cancelled' | string
    termIn: string
    totalEmployee: number
    mrr: number
    totalAmount: number
    beforeMeeting: {
        id: number
        name: string
    } | null
}

