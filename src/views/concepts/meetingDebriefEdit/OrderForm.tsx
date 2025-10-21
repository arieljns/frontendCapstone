import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import CustomerDetailSectionEdit from './components/CustomerDetailSection'
import { useOrderFormStore } from './store/orderFormStore'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ReactNode } from 'react'
import type { OrderFormSchema, SelectedProduct } from './types'
import type { CommonProps } from '@/@types/common'
import { listOfProducts } from '@/constants/products.constant'
import ProductSelectSectionEdit from './components/ProductSelectSection'
import FollowupSectionEdit from './components/FollowupSection'
import { useParams } from 'react-router-dom'
import { useOrderListStore } from '../orders/OrderList/store/orderListStore'
import useOrderList from '../orders/OrderList/hooks/useOrderlist'

type OrderFormProps = {
    children: ReactNode
    onFormSubmit: (values: OrderFormSchema) => void
    defaultValues?: OrderFormSchema
    defaultProducts?: SelectedProduct[]
    newOrder?: boolean
    beforeMeeting: object
} & CommonProps

const SelectedProductSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Product name cannot be empty'),
    price: z.number().nonnegative('Price must be 0 or greater'),
    img: z.string().url('Image URL must be valid'),
    productCode: z.string().min(1, 'Product code cannot be empty'),
})

const baseValidationSchema = z.object({
    sentiment: z.string().min(1, { message: 'Sentiment required' }),
    status: z.string().min(1, { message: 'Status required' }),
    excitementLevel: z
        .string()
        .min(1, { message: 'Excitement level required' }),
    promo: z.string().min(1, { message: 'Promo required' }),
    decisionMaker: z.string().min(1, { message: 'Decision maker required' }),
    activationAgreement: z
        .string()
        .min(1, { message: 'activation agreement required ' }),
    expiredDate: z.date(),
    products: z.array(SelectedProductSchema).min(1, {
        message: 'At least one product is required',
    }),
    totalEmployee: z.coerce
        .number()
        .min(1, { message: 'Total Employee must exist' }),
    discountRate: z.string().min(1, { message: 'Discount Rate Required' }),
    termIn: z.string().min(1, { message: 'Term In required' }),
    beforeMeeting: z
        .string()
        .min(1, { message: 'must include before meeting number' }),
})

const MeetingDebriefFormEdit = (props: OrderFormProps) => {
    const { onFormSubmit, children, defaultValues, defaultProducts } = props
    const params = useParams()

    const orderList = useOrderListStore((s) => s.orderList)

    const orderListFormData = orderList.filter((data) => {
        return data.id === parseInt(params.id)
    })

    console.log(
        'this is the curated list of orderlist data:',
        orderListFormData,
    )

    const { setSelectedProduct } = useOrderFormStore()

    useEffect(() => {
        if (defaultProducts) {
            setSelectedProduct(defaultProducts)
        }
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        return () => {
            setSelectedProduct([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [derived, setDerived] = useState({
        total: 0,
        mrr: 0,
    })

    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const onSubmit = (values: OrderFormSchema) => {
        setIsFormSubmitted(true)
        const totalAmount = derived.total
        const mrr = derived.mrr
        const payload = {
            ...values,
            totalAmount,
            mrr,
            isFormSubmitted,
        }
        console.log('this is the payload:', payload)
        onFormSubmit?.(payload)
    }

    const onError = (errors: typeof errors) => {
        console.error('Form submission errors:', errors)
    }

    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
    } = useForm<OrderFormSchema>({
        resolver: zodResolver(baseValidationSchema),
        defaultValues: {
            ...defaultValues,
        },
    })

    const productOption = listOfProducts.map((product) => ({
        label: product.name,
        value: product.id,
        img: product.img,
    }))

    const products = watch('products')

    const formValues = watch()

    useEffect(() => {
        console.log('Form Values', formValues)
    }, [formValues])

    useEffect(() => {
        console.log('Products watched:', products)
    }, [products])

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Container>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="flex flex-col gap-4">
                                <ProductSelectSectionEdit
                                    control={control}
                                    productList={listOfProducts}
                                    productOption={productOption}
                                    watch={watch}
                                    errors={errors}
                                    onDerivedChange={setDerived}
                                />
                                <CustomerDetailSectionEdit
                                    control={control}
                                    errors={errors}
                                />
                                <FollowupSectionEdit
                                    control={control}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomStickyBar>{children}</BottomStickyBar>
            </Form>
        </div>
    )
}

export default MeetingDebriefFormEdit
