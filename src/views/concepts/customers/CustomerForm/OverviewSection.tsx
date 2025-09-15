import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from './types'
import DatePicker from '@/components/ui/DatePicker/DatePicker'
type OverviewSectionProps = FormSectionBaseProps

const OverviewSection = ({ control, errors }: OverviewSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Company Overview</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Company Name"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Company Name"
                                {...field}
                                value={field.value || ''}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="PIC Name"
                    invalid={Boolean(errors.picName)}
                    errorMessage={errors.picName?.message}
                >
                    <Controller
                        name="picName"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="pic name"
                                {...field}
                                value={field.value || ''}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <FormItem
                label="Company Size"
                invalid={Boolean(errors.companySize)}
                errorMessage={errors.companySize?.message}
            >
                <Controller
                    name="companySize"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="desc"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="desc"
                invalid={Boolean(errors.desc)}
                errorMessage={errors.desc?.message}
            >
                <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="desc"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Notes"
                invalid={Boolean(errors.notes)}
                errorMessage={errors.notes?.message}
            >
                <Controller
                    name="notes"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="pic name"
                            {...field}
                            value={field.value || ''}
                        />
                    )}
                />
            </FormItem>

            <label className="form-label mb-2">Meeting Date</label>
            <DatePicker />
        </Card>
    )
}

export default OverviewSection
