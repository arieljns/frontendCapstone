import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { FormItem } from '@/components/ui/Form'
import {
    currentSystemList,
    systemRequirementOptions,
} from '@/constants/package.constant'
import { Controller } from 'react-hook-form'
import { components } from 'react-select'
import type { FormSectionBaseProps } from './types'
import type { ControlProps, OptionProps } from 'react-select'

type AddressSectionProps = FormSectionBaseProps

type PackageOption = {
    id: number
    name: string
}

const { Control } = components

const CustomSelectOption = (props: OptionProps<PackageOption>) => {
    return (
        <DefaultOption<PackageOption>
            {...props}
            customLabel={(data) => (
                <span className="flex flex-col">
                    <span className="font-medium">{data.name}</span>
                </span>
            )}
        />
    )
}

const CustomControl = ({ children, ...props }: ControlProps<PackageOption>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <div className="ltr:ml-4 rtl:mr-4 text-sm font-medium text-gray-700">
                    {selected.name}
                </div>
            )}
            {children}
        </Control>
    )
}

const AddressSection = ({ control, errors }: AddressSectionProps) => {
    return (
        <Card>
            <h4 className="mb-6">Meeting Feature</h4>

            {/* Feature */}
            <FormItem
                label="Current System"
                invalid={Boolean(errors.currentSystem)}
                errorMessage={errors.currentSystem?.message}
            >
                <Controller
                    name="currentSystem"
                    control={control}
                    render={({ field }) => {
                        console.log('Current selected values:', field.value)
                        return (
                            <Select<PackageOption, true>
                                isMulti
                                options={currentSystemList}
                                {...field}
                                components={{
                                    Option: CustomSelectOption,
                                    Control: CustomControl,
                                }}
                                placeholder=""
                                value={currentSystemList.filter((option) =>
                                    field.value?.includes(option.name),
                                )}
                                onChange={(options) => {
                                    console.log('User selected:', options)
                                    field.onChange(
                                        options?.map((option) => option.name) ??
                                            [],
                                    )
                                }}
                            />
                        )
                    }}
                />
            </FormItem>

            {/* Current System */}
            <FormItem
                label="System Requirements"
                invalid={Boolean(errors.systemRequirement)}
                errorMessage={errors.systemRequirement?.message}
            >
                <Controller
                    name="systemRequirement"
                    control={control}
                    render={({ field }) => {
                        console.log(
                            'Current selected system requirement:',
                            field.value,
                        )
                        return (
                            <Select<PackageOption, true>
                                isMulti
                                options={systemRequirementOptions}
                                {...field}
                                components={{
                                    Option: CustomSelectOption,
                                    Control: CustomControl,
                                }}
                                placeholder=""
                                value={systemRequirementOptions.filter(
                                    (option) =>
                                        field.value?.includes(option.name),
                                )}
                                onChange={(options) => {
                                    console.log('User selected:', options)
                                    field.onChange(
                                        options?.map((option) => option.name) ??
                                            [],
                                    )
                                }}
                            />
                        )
                    }}
                />
            </FormItem>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* System Requirements */}
                <FormItem
                    label="System Requirements"
                    invalid={Boolean(errors.systemRequirement)}
                    errorMessage={errors.systemRequirement?.message}
                >
                    <Controller
                        name="systemRequirement"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="System Requirements"
                                {...field}
                            />
                        )}
                    />
                </FormItem>

                {/* Budget */}
                <FormItem
                    label="Budget"
                    invalid={Boolean(errors.budget)}
                    errorMessage={errors.budget?.message}
                >
                    <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Budget"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default AddressSection
