type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    dialCode: string
    address: string
    postcode: string
    city: string
    country: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

type OrderHistory = {
    id: string
    item: string
    status: string
    amount: number
    date: number
}

type PaymentMethod = {
    cardHolderName: string
    cardType: string
    expMonth: string
    expYear: string
    last4Number: string
    primary: boolean
}

type Subscription = {
    plan: string
    status: string
    billing: string
    nextPaymentDate: number
    amount: number
}

export type GetCustomersListResponse = {
    list: Customer[]
    total: number
}

export type Filter = {
    purchasedProducts: string
    purchaseChannel: Array<string>
}

export type Customer = {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    img: string
    role: string
    lastOnline: number
    status: string
    personalInfo: PersonalInfo
    orderHistory: OrderHistory[]
    paymentMethod: PaymentMethod[]
    subscription: Subscription[]
    totalSpending: number
}

export type MemberMetric = {
    userUuid?: string
    userId: string
    email: string
    name: string
    leadCount: number
    totalDeals: number
    closedWon: number
    totalRevenue: number
    totalMrr: number
    conversionRate: number
    initials: string
}


export type Meeting = {
    id: string
    name: string
    desc: string
    notes: string
    budget: number
    companySize: number
    picName: string
    picRole: string[]
    currentSystem: string[]
    systemRequirement: string[]
    totalTask: number
    completedTask: number
}
