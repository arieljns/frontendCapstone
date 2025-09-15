import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Affix from '@/components/shared/Affix'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import { apiGetProductList } from '@/services/ProductService'
import ProductSelectSection from './components/ProductSelectSection'
import CustomerDetailSection from './components/CustomerDetailSection'
import FollowupSection from './components/FollowupSection'
import PaymentMethodSection from './components/PaymentMethodSection'
import Navigator from './components/Navigator'
import { useOrderFormStore } from './store/orderFormStore'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useResponsive from '@/utils/hooks/useResponsive'
import useSWR from 'swr'
import isEmpty from 'lodash/isEmpty'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { ReactNode } from 'react'
import type {
    GetProductListResponse,
    OrderFormSchema,
    SelectedProduct,
} from './types'
import type { TableQueries, CommonProps } from '@/@types/common'
import { listOfProducts } from '@/constants/products.constant'
import { useProjectListStore } from '../../projects/ProjectList/store/projectListStore'

type OrderFormProps = {
    children: ReactNode
    onFormSubmit: (values: OrderFormSchema) => void
    defaultValues?: OrderFormSchema
    defaultProducts?: SelectedProduct[]
    newOrder?: boolean
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
})

const OrderForm = (props: OrderFormProps) => {
    const { onFormSubmit, children, defaultValues, defaultProducts } = props
    const { projectList } = useProjectListStore()

    console.log(projectList)

    const { setProductOption, setProductList, setSelectedProduct } =
        useOrderFormStore()

    const { getTopGapValue } = useLayoutGap()

    const { larger } = useResponsive()

    useSWR(
        [
            '/api/products',
            {
                pageIndex: 1,
                pageSize: 10,
                query: '',
                sort: {
                    order: '',
                    key: '',
                },
            } as TableQueries,
        ],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetProductList<GetProductListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
            onSuccess: (resp) => {
                const list = resp.list.map(
                    ({ id: value, name: label, img }) => ({
                        label,
                        value,
                        img,
                    }),
                )
                setProductList(resp.list)
                setProductOption(list)
            },
        },
    )

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

    const onSubmit = (values: OrderFormSchema) => {
        console.log('Form submitted with values:', values)
        onFormSubmit?.(values)
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
        // defaultValues: {
        //     paymentMethod: 'creditOrDebitCard',
        //     ...(defaultValues ? defaultValues : {}),
        // },
        resolver: zodResolver(baseValidationSchema),
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
    const selectedPaymentMethod = watch('paymentMethod', '')

    return (
        <div className="flex">
            <Form
                className="flex-1 flex flex-col overflow-hidden"
                onSubmit={handleSubmit(onSubmit, onError)}
            >
                <Container>
                    <div className="flex gap-4">
                        {larger.xl && (
                            <div className="w-[360px]">
                                <Affix offset={getTopGapValue()}>
                                    <Card>
                                        <Navigator />
                                    </Card>
                                </Affix>
                            </div>
                        )}

                        <div className="flex-1">
                            <div className="flex flex-col gap-4">
                                <ProductSelectSection
                                    control={control}
                                    productList={listOfProducts}
                                    productOption={productOption}
                                    watch={watch}
                                    errors={errors}
                                />
                                <CustomerDetailSection
                                    control={control}
                                    errors={errors}
                                />
                                <FollowupSection
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

export default OrderForm
