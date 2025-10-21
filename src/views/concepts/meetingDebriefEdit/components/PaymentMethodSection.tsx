import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import FormCustomFormatInput from '@/components/shared/CustomFormatInput'
import FormPatternInput from '@/components/shared/PatternInput'
import { Controller } from 'react-hook-form'
import { TbCreditCard, TbBuildingBank } from 'react-icons/tb'
import { components } from 'react-select'
import type {
    FormSectionBaseProps,
    GetPaymentMethodFields,
    PaymentType,
} from '../types'
import type { ControlProps, OptionProps } from 'react-select'
import type { FieldErrors } from 'react-hook-form'
import type { ReactNode } from 'react'

type CreditCardFieldError = FieldErrors<
    GetPaymentMethodFields<'creditOrDebitCard'>
>
type BankTransferFieldError = FieldErrors<
    GetPaymentMethodFields<'bankTransfer'>
>

type PaymentMethodSectionProps = FormSectionBaseProps & {
    selectedPaymentMethod: string
}

type PaymentMethodOption = {
    label: string
    value: PaymentType
    icon: ReactNode
}

const paymentMethodOptions: PaymentMethodOption[] = [
    {
        label: 'Credit/Debit card',
        value: 'creditOrDebitCard',
        icon: <TbCreditCard />,
    },
    { label: 'Bank transfer', value: 'bankTransfer', icon: <TbBuildingBank /> },
]

function limit(val: string, max: string) {
    if (val.length === 1 && val[0] > max[0]) {
        val = '0' + val
    }

    if (val.length === 2) {
        if (Number(val) === 0) {
            val = '01'
        } else if (val > max) {
            val = max
        }
    }

    return val
}

function cardExpiryFormat(val: string) {
    const month = limit(val.substring(0, 2), '12')
    const date = limit(val.substring(2, 4), '31')

    return month + (date.length ? '/' + date : '')
}

const { Control } = components

const CustomSelectOption = (props: OptionProps<PaymentMethodOption>) => {
    return (
        <DefaultOption<PaymentMethodOption>
            {...props}
            customLabel={(data, label) => (
                <span className="flex items-center gap-2">
                    <span className="text-xl">{data.icon}</span>
                    <span>{label}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({
    children,
    ...props
}: ControlProps<PaymentMethodOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <span className="text-xl ltr:ml-4 rtl:mr-4 text-primary">
                    {selected.icon}
                </span>
            )}
            {children}
        </Control>
    )
}

const PaymentMethodSection = ({
    control,
    errors,
    selectedPaymentMethod,
}: PaymentMethodSectionProps) => {
    return (
        <Card id="payment">
            <h4 className="mb-6">Payment Details</h4>
            <FormItem
                label="Payment method"
                invalid={Boolean(errors.paymentMethod)}
                errorMessage={errors.paymentMethod?.message}
            >
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <Select<PaymentMethodOption>
                            options={paymentMethodOptions}
                            {...field}
                            components={{
                                Option: CustomSelectOption,
                                Control: CustomControl,
                            }}
                            placeholder=""
                            value={paymentMethodOptions.filter(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            {/* <FormItem
                label="Term In"
                invalid={Boolean(errors.paymentMethod)}
                errorMessage={errors.paymentMethod?.message}
            >
                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => (
                        <Select<PaymentMethodOption>
                            options={paymentMethodOptions}
                            {...field}
                            components={{
                                Option: CustomSelectOption,
                                Control: CustomControl,
                            }}
                            placeholder=""
                            value={paymentMethodOptions.filter(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem> */}
            {selectedPaymentMethod === 'creditOrDebitCard' && (
                <>
                    <FormItem
                        label="Stake Holder"
                        invalid={Boolean(
                            (errors as CreditCardFieldError).cardHolderName,
                        )}
                        errorMessage={
                            (errors as CreditCardFieldError).cardHolderName
                                ?.message
                        }
                    >
                        <Controller
                            name="cardHolderName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Card holder name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Credit card number"
                        invalid={Boolean(
                            (errors as CreditCardFieldError).ccNumber,
                        )}
                        errorMessage={
                            (errors as CreditCardFieldError).ccNumber?.message
                        }
                    >
                        <Controller
                            name="ccNumber"
                            control={control}
                            render={({ field }) => (
                                <FormPatternInput
                                    placeholder="•••• •••• •••• ••••"
                                    format="#### #### #### ####"
                                    value={field.value}
                                    onValueChange={(e) => {
                                        field.onChange(e.value)
                                    }}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="grid grid-cols-2 gap-4">
                        <FormItem
                            label="Expiration date"
                            invalid={Boolean(
                                (errors as CreditCardFieldError).cardExpiry,
                            )}
                            errorMessage={
                                (errors as CreditCardFieldError).cardExpiry
                                    ?.message
                            }
                        >
                            <Controller
                                name="cardExpiry"
                                control={control}
                                render={({ field }) => (
                                    <FormCustomFormatInput
                                        placeholder="••/••"
                                        format={cardExpiryFormat}
                                        value={field.value}
                                        onValueChange={(e) => {
                                            field.onChange(e.value)
                                        }}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                </>
            )}

            {selectedPaymentMethod === 'bankTransfer' && (
                <>
                    <FormItem
                        label="Bank name"
                        invalid={Boolean(
                            (errors as BankTransferFieldError).bankName,
                        )}
                        errorMessage={
                            (errors as BankTransferFieldError).bankName?.message
                        }
                    >
                        <Controller
                            name="bankName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Bank name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Account number"
                        invalid={Boolean(
                            (errors as BankTransferFieldError).accountNumber,
                        )}
                        errorMessage={
                            (errors as BankTransferFieldError).accountNumber
                                ?.message
                        }
                    >
                        <Controller
                            name="accountNumber"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Account number"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Account holder name"
                        invalid={Boolean(
                            (errors as BankTransferFieldError)
                                .accountHolderName,
                        )}
                        errorMessage={
                            (errors as BankTransferFieldError).accountHolderName
                                ?.message
                        }
                    >
                        <Controller
                            name="accountHolderName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Account holder name"
                                    {...field}
                                />
                            )}
                        />
                    </FormItem>
                </>
            )}
        </Card>
    )
}

export default PaymentMethodSection
