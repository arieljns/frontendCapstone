import { Controller } from 'react-hook-form'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import type { Control, FieldErrors } from 'react-hook-form'
import type { MemberFormValues } from './memberFormConfig'

const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' },
]

type MemberFormFieldsProps = {
    control: Control<MemberFormValues>
    errors: FieldErrors<MemberFormValues>
}

const MemberFormFields = ({ control, errors }: MemberFormFieldsProps) => {
    return (
        <FormContainer>
            <FormItem
                label="Email"
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="email"
                            autoComplete="off"
                            placeholder="Enter email"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Password"
                invalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter password"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Role"
                invalid={Boolean(errors.role)}
                errorMessage={errors.role?.message}
            >
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={roleOptions}
                            value={roleOptions.find(
                                (option) => option.value === field.value,
                            )}
                            onChange={(option) =>
                                field.onChange(option?.value ?? 'user')
                            }
                            isClearable={false}
                            placeholder="Select role"
                        />
                    )}
                />
            </FormItem>
        </FormContainer>
    )
}

export default MemberFormFields
