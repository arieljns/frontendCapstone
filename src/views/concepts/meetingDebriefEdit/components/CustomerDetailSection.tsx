import Card from '@/components/ui/Card'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { FormItem } from '@/components/ui/Form'
import {
    sentiment_labels,
    excitement_levels,
    status,
} from '@/constants/sentiment.constant'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type CustomerDetailSectionProps = FormSectionBaseProps

type SentimentOption = {
    value: string
    display: string
}

type StatusOption = {
    value: string
    label: string
}

const CustomerDetailSectionEdit = ({
    control,
    errors,
}: CustomerDetailSectionProps) => {
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
                        render={({ field }) => {
                            console.log('this is field value', field.value)
                            return (
                                <Select<SentimentOption>
                                    options={excitement_levels}
                                    placeholder="Excitement Level"
                                    value={excitement_levels.find(
                                        (option) =>
                                            option.value === field.value,
                                    )}
                                    onChange={(option) =>
                                        field.onChange(option?.value)
                                    }
                                />
                            )
                        }}
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
                                value={status.find(
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

export default CustomerDetailSectionEdit
