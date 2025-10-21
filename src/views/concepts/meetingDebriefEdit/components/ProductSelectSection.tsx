import { useMemo, useState, useEffect } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Checkbox from '@/components/ui/Checkbox'
import Avatar from '@/components/ui/Avatar'
import Table from '@/components/ui/Table'
import ScrollBar from '@/components/ui/ScrollBar'
import AutoComplete from '@/components/shared/AutoComplete'
import useResponsive from '@/utils/hooks/useResponsive'
import classNames from '@/utils/classNames'
import { NumericFormat } from 'react-number-format'
import { TbSearch } from 'react-icons/tb'
import type {
    Product,
    ProductOption,
    OrderFormSchema,
    ProductTermIn,
} from '../types'
import { listOfProducts } from '@/constants/products.constant'
import {
    Control,
    useController,
    FieldErrors,
    Controller,
    UseFormWatch,
} from 'react-hook-form'
import { FormItem, Select } from '@/components/ui'
import { TbTrash } from 'react-icons/tb'
import { promoList } from '@/constants/promo.constant'

const { Tr, Th, Td, THead, TBody } = Table

type derived = {
    total: number
    mrr: number
}

type Props = {
    control: Control<OrderFormSchema>
    productList: Product[]
    productOption: ProductOption[]
    errors: FieldErrors<OrderFormSchema>
    onDerivedChange: React.Dispatch<React.SetStateAction<derived>>
    watch: UseFormWatch<OrderFormSchema>
}

type promoOption = {
    label: string
    value: string
}

const ProductSelectSectionEdit = ({
    control,
    productList,
    productOption,
    errors,
    onDerivedChange,
    watch,
}: Props) => {
    const { field } = useController({
        name: 'products',
        control,
    })

    const [inputValue, setInputValue] = useState('')
    const [termIn, setTermIn] = useState<ProductTermIn>({
        termIn: 0,
        discountRate: 0,
        totalEmployee: 0,
    })
    const [productsDialogOpen, setProductsDialogOpen] = useState(false)
    const { smaller } = useResponsive()

    const selectedProducts: Product[] = field.value ?? []

    const handleOptionSelect = (option: ProductOption) => {
        const selected = productList.find(
            (product) => product.id === option.value,
        )

        if (selected) {
            const exists = selectedProducts.some((p) => p.id === selected.id)
            if (!exists) {
                field.onChange([...selectedProducts, selected])
            }
        }
    }

    const handleProductChecked = (checked: boolean, product: Product) => {
        if (checked) {
            if (!selectedProducts.some((p) => p.id === product.id)) {
                field.onChange([...selectedProducts, product])
            }
        } else {
            field.onChange(selectedProducts.filter((p) => p.id !== product.id))
        }
    }

    const totalEmployeeState = watch('totalEmployee')
    const discountRateState = watch('discountRate')
    const termInState = watch('termIn')

    const total = useMemo(() => {
        const beforeDiscount = selectedProducts.reduce(
            (acc, product) => acc + product.price * totalEmployeeState * 12,
            0,
        )
        console.log('this before the discount', beforeDiscount)
        const discountYield = discountRateState / 100
        console.log('discount yield', discountYield)
        const discountAmount = beforeDiscount * discountYield
        const afterDiscount = beforeDiscount - discountAmount
        const tax = afterDiscount * 0.11
        return afterDiscount + tax
    }, [selectedProducts, totalEmployeeState, discountRateState])

    const mrr = useMemo(() => {
        return total / 12
    }, [total])

    useEffect(() => {
        onDerivedChange({ total, mrr })
    }, [total, mrr])

    return (
        <>
            <Card id="selectProducts">
                <h4 className="mb-6">Select products</h4>
                <div className="flex items-center gap-2">
                    <AutoComplete<ProductOption>
                        data={productOption}
                        optionKey={(product) => product.label}
                        value={inputValue}
                        renderOption={(option) => (
                            <div className="flex items-center gap-2">
                                <Avatar shape="round" src={option.img} />
                                <span>{option.label}</span>
                            </div>
                        )}
                        suffix={<TbSearch className="text-lg" />}
                        placeholder="Search product"
                        onInputChange={setInputValue}
                        onOptionSelected={handleOptionSelect}
                    />
                    <Button
                        type="button"
                        variant="solid"
                        onClick={() => setProductsDialogOpen(true)}
                    >
                        Browse products
                    </Button>
                </div>
                <Table compact={smaller.sm} className="mt-6">
                    <THead>
                        <Tr>
                            <Th className="w-[70%]">Product</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {selectedProducts.length > 0 ? (
                            selectedProducts.map((product) => (
                                <Tr key={product.id}>
                                    <Td>
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                shape="round"
                                                src={product.img}
                                            />
                                            <div>
                                                <div className="heading-text font-bold">
                                                    {product.name}
                                                </div>
                                                <div>
                                                    ID: {product.productCode}
                                                </div>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="heading-text font-bold">
                                            <NumericFormat
                                                fixedDecimalScale
                                                prefix="Rp "
                                                displayType="text"
                                                value={product.price}
                                                decimalScale={2}
                                                thousandSeparator={true}
                                            />
                                        </div>
                                    </Td>
                                    <Td>
                                        <div className="heading-text ">
                                            <div className="heading-text ">
                                                /Employee
                                            </div>
                                        </div>
                                    </Td>
                                    <Td>
                                        <TbTrash />
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td className="text-center" colSpan={3}>
                                    No product selected!
                                </Td>
                            </Tr>
                        )}
                    </TBody>
                </Table>

                <div className="mt-4 flex justify-between">
                    <span className="text-base flex  gap-2">
                        <span className="font-semibold">Total Employee: </span>
                        <span className="text-lg  heading-text flex  gap-4">
                            <FormItem
                                invalid={Boolean(errors.totalEmployee)}
                                errorMessage={errors.totalEmployee?.message}
                            >
                                <Controller
                                    name="totalEmployee"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="number"
                                            className="border rounded-lg px-2 w-16 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </span>
                        Employee
                    </span>
                    <hr />
                    <span className="text-base flex  gap-2">
                        <span className="font-semibold">Discount Rate: </span>
                        <span className="text-lg  heading-text flex  gap-4">
                            <FormItem
                                invalid={Boolean(errors.discountRate)}
                                errorMessage={errors.discountRate?.message}
                            >
                                <Controller
                                    name="discountRate"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="number"
                                            className="border rounded-lg px-2 w-14 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </span>
                        %
                    </span>
                    <span className="text-base flex  gap-2">
                        <span className="font-semibold">Term In: </span>
                        <span className="text-lg  heading-text flex  gap-4">
                            <FormItem
                                invalid={Boolean(errors.termIn)}
                                errorMessage={errors.termIn?.message}
                            >
                                <Controller
                                    name="termIn"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="number"
                                            className="border rounded-lg px-2 w-14 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            {...field}
                                        />
                                    )}
                                />
                            </FormItem>
                        </span>
                        Months
                    </span>
                </div>
                <div>
                    <div>
                        <FormItem
                            label="Promo"
                            invalid={Boolean(errors.promo)}
                            errorMessage={errors.promo?.message}
                        >
                            <Controller
                                name="promo"
                                control={control}
                                render={({ field }) => (
                                    <Select<promoOption>
                                        options={promoList}
                                        {...field}
                                        placeholder="promo"
                                        value={promoList.filter(
                                            (option) =>
                                                option.value === field.value,
                                        )}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                </div>

                <div className="mt-2 flex justify-end">
                    <span className="text-base flex items-center gap-2">
                        <span className="font-semibold">Total: </span>
                        <span className="text-lg font-bold heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                prefix="Rp "
                                displayType="text"
                                value={total}
                                decimalScale={2}
                                thousandSeparator={true}
                            />
                        </span>
                    </span>
                </div>
                <div className="mt-8 flex justify-end">
                    <span className="text-base flex items-center gap-2">
                        <span className="font-semibold">Total MRR: </span>
                        <span className="text-lg font-bold heading-text">
                            <NumericFormat
                                fixedDecimalScale
                                prefix="Rp "
                                displayType="text"
                                value={total / termInState}
                                decimalScale={2}
                                thousandSeparator={true}
                            />
                        </span>
                    </span>
                </div>
            </Card>
            <Dialog
                isOpen={productsDialogOpen}
                onClose={() => setProductsDialogOpen(false)}
                onRequestClose={() => setProductsDialogOpen(false)}
            >
                <div className="text-center mb-6">
                    <h4 className="mb-1">All products</h4>
                    <p>Add products to this order.</p>
                </div>
                <div className="mt-4">
                    <div className="mb-6">
                        <ScrollBar
                            className={classNames('overflow-y-auto h-80')}
                        >
                            {listOfProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="py-3 pr-5 rounded-lg flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="px-1">
                                            <Checkbox
                                                checked={selectedProducts.some(
                                                    (selected) =>
                                                        selected.id ===
                                                        product.id,
                                                )}
                                                onChange={(value) =>
                                                    handleProductChecked(
                                                        value,
                                                        product,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                                size="lg"
                                                shape="round"
                                                src={product.img}
                                            />
                                            <div>
                                                <p className="heading-text font-bold">
                                                    {product.name}
                                                </p>
                                                <p>ID: {product.productCode}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ScrollBar>
                    </div>
                </div>
                <Button
                    block
                    type="button"
                    variant="solid"
                    onClick={() => setProductsDialogOpen(false)}
                >
                    Done
                </Button>
            </Dialog>
        </>
    )
}

export default ProductSelectSectionEdit
