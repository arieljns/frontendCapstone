import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import {
    sentiment_labels,
    excitement_levels,
    status
} from '@/constants/sentiment.constant'
import { countryList } from '@/constants/countries.constant'
import { Controller } from 'react-hook-form'
import { components } from 'react-select'
import type { FormSectionBaseProps } from '../types'
import type { ControlProps, OptionProps } from 'react-select'

type CustomerDetailSectionProps = FormSectionBaseProps

type CountryOption = {
    label: string
    dialCode: string
    value: string
}

type SentimentOption = {
    value: string
    display: string
}

type StatusOption = {
    value: string
    label: string
}

const { Control } = components

const CustomSelectOption = (props: OptionProps<CountryOption>) => {
    return (
        <DefaultOption<CountryOption>
            {...props}
            customLabel={(data) => (
                <span className="flex items-center gap-2">
                    <Avatar
                        shape="circle"
                        size={20}
                        src={`/img/countries/${data.value}.png`}
                    />
                    <span>{data.dialCode}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<CountryOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={20}
                    src={`/img/countries/${selected.value}.png`}
                />
            )}
            {children}
        </Control>
    )
}

const CustomerDetailSection = ({
    control,
    errors,
}: CustomerDetailSectionProps) => {
    const dialCodeList = useMemo(() => {
        const newCountryList: Array<CountryOption> = JSON.parse(
            JSON.stringify(countryList),
        )

        return newCountryList.map((country) => {
            country.label = country.dialCode
            return country
        })
    }, [])

    return (
        <Card id="customerDetails">
            <h4 className="mb-6">Customer Status</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Sentiment"
                    invalid={Boolean(errors.sentiment)}
                    errorMessage={errors.sentiment?.message}
                >
                    <Controller
                        name="sentiment"
                        control={control}
                        render={({ field }) => (
                            <Select<SentimentOption>
                                options={sentiment_labels}
                                {...field}
                                placeholder="Select sentiment"
                                value={sentiment_labels.filter(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Excitement Level"
                    invalid={Boolean(errors.excitementLevel)}
                    errorMessage={errors.excitementLevel?.message}
                >
                    <Controller
                        name="excitementLevel"
                        control={control}
                        render={({ field }) => (
                            <Select<SentimentOption>
                                options={excitement_levels}
                                {...field}
                                placeholder="Excitement Level"
                                value={excitement_levels.filter(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Status"
                    invalid={Boolean(errors.status)}
                    errorMessage={errors.status?.message}
                >
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select<SentimentOption>
                                options={status}
                                {...field}
                                placeholder="Excitement Level"
                                value={status.filter(
                                    (option) => option.value === field.value,
                                )}
                                onChange={(option) =>
                                    field.onChange(option?.value)
                                }
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default CustomerDetailSection
