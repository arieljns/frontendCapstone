import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import { activationAgreement } from '@/constants/activationAgreement.constant'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'

type BillingAddressSectionProps = FormSectionBaseProps

type activationOption = {
    label: string
    value: string
}

const FollowupSectionEdit = ({
    control,
    errors,
}: BillingAddressSectionProps) => {
    return (
        <Card id="addressInformation">
            <h4 className="mb-6">Contract</h4>

            <FormItem
                label="Activation Agreement "
                invalid={Boolean(errors.promo)}
                errorMessage={errors.promo?.message}
            >
                <Controller
                    name="activationAgreement"
                    control={control}
                    render={({ field }) => (
                        <Select<activationOption>
                            options={activationAgreement}
                            {...field}
                            placeholder="activation agreement"
                            value={activationAgreement.filter(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Decision Maker"
                invalid={Boolean(errors.decisionMaker)}
                errorMessage={errors.decisionMaker?.message}
            >
                <Controller
                    name="decisionMaker"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Decision Maker"
                            {...field}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Expired Date"
                invalid={!!errors.expiredDate}
                errorMessage={errors.expiredDate?.message}
            >
                <Controller
                    name="expiredDate"
                    control={control}
                    render={({ field }) => {
                        let displayDate = ''
                        if (
                            field.value instanceof Date &&
                            !isNaN(field.value.getTime())
                        ) {
                            displayDate = field.value
                                .toISOString()
                                .split('T')[0]
                        }

                        return (
                            <Input
                                type="date"
                                value={displayDate}
                                onChange={(e) => {
                                    const newDate = new Date(e.target.value)
                                    field.onChange(newDate)
                                }}
                            />
                        )
                    }}
                />
            </FormItem>
        </Card>
    )
}

export default FollowupSectionEdit
