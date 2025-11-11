import { useState } from 'react'
import { FormItem, Form } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import NewTaskField from './NewTaskField'
import { useProjectListStore } from '../store/projectListStore'
import { useForm, Controller } from 'react-hook-form'
import { apiPostProject } from '@/services/ProjectService'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Project } from '../types'
import type { ZodType } from 'zod'

const picRoleOptions = [
    { label: 'Manager', value: 'manager' },
    { label: 'Developer', value: 'developer' },
    { label: 'Designer', value: 'designer' },
]

const categoryOptions = [
    { label: 'manufacturing', value: 'manufacturing' },
    { label: 'retail', value: 'retail' },
    { label: 'service', value: 'service' },
    { label: 'agriculture', value: 'agriculture' },
    { label: 'construction', value: 'construction' },
    { label: 'healthcare', value: 'healthcare' },
    { label: 'entertainment', value: 'entertainment' },
]

const currentSystemOptions = [
    { label: 'Manual', value: 'manual' },
    { label: 'Spreadsheet', value: 'spreadsheet' },
    { label: 'Fingerprint', value: 'fingerprint' },
    { label: 'Odoo', value: 'odoo' },
]

const systemRequirementOptions = [
    { label: 'Automated Reports', value: 'automatic_report' },
    { label: 'Auto Disburstment', value: 'auto_disburstment' },
    { label: 'KPI', value: 'kpi' },
    { label: 'Recruitment Pipeline', value: 'recruitment_pipeline' },
    { label: 'Attendance', value: 'attendance' },
    { label: 'Auto Payroll', value: 'auto_payroll' },
]

type FormSchema = {
    title: string
    companySize: string
    notes: string
    picName: string
    picWhatsapp?: string
    picEmail?: string
    picRole: string[]
    currentSystem: string[]
    systemRequirement: string[]
    budget: number
    meetingDate: Date
    category: string[]
}

type TaskCount = {
    completedTask?: number
    totalTask?: number
}

const validationSchema: ZodType<FormSchema> = z.object({
    title: z.string().min(1, { message: 'Company Name required' }),
    companySize: z.string().min(1, { message: 'Company Size required' }),
    notes: z.string().min(1, { message: 'Content required' }),
    picName: z.string().min(1, { message: 'PIC Name required' }),
    picWhatsapp: z
        .union([
            z
                .string()
                .regex(/^\+?[0-9\s\-()]{6,}$/, {
                    message: 'Please enter a valid WhatsApp number',
                }),
            z.literal(''),
        ])
        .optional(),
    picEmail: z
        .union([
            z.string().email({ message: 'Please enter a valid email address' }),
            z.literal(''),
        ])
        .optional(),
    picRole: z
        .array(z.string())
        .min(1, { message: 'At least 1 role required' }),
    currentSystem: z
        .array(z.string())
        .min(1, { message: 'Please describe the current system' }),
    systemRequirement: z
        .array(z.string())
        .min(1, { message: 'Please provide your requirements' }),
    budget: z.coerce
        .number()
        .min(1, { message: 'Please provide a valid budget' }),
    meetingDate: z.coerce.date().min(new Date(), {
        message: 'Meeting date must be in the future',
    }),
    category: z.array(z.string()).min(1, { message: 'Category is required' }),
})

const NewProjectForm = ({ onClose }: { onClose: () => void }) => {
    const { updateProjectList } = useProjectListStore()

    const [taskCount, setTaskCount] = useState<TaskCount>({})
    const [isSubmiting, setSubmiting] = useState(false)

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<z.infer<typeof validationSchema>>({
        defaultValues: {
            title: '',
            companySize: '',
            notes: '',
            picName: '',
            picWhatsapp: '',
            picEmail: '',
            picRole: [],
            currentSystem: [],
            systemRequirement: [],
            budget: 0,
            meetingDate: new Date(),
            category: [],
        },
        resolver: zodResolver(validationSchema),
    })

    const handleAddNewTask = (count: TaskCount) => {
        setTaskCount(count)
    }

    const onSubmit = async (formValue: FormSchema) => {
        console.log('Form is being submitted')
        setSubmiting(true)
        const {
            title,
            companySize,
            picName,
            picWhatsapp,
            picEmail,
            picRole,
            currentSystem,
            systemRequirement,
            budget,
            notes,
            meetingDate,
            category,
        } = formValue

        const { totalTask, completedTask } = taskCount

        const values: Project = {
            name: title,
            desc: notes,
            totalTask: totalTask as number,
            completedTask: completedTask as number,
            progression:
                ((completedTask as number) / (totalTask as number)) * 100 || 0,
            companySize,
            picName,
            picWhatsapp,
            picEmail,
            picRole,
            notes,
            currentSystem,
            systemRequirement,
            budget,
            meetingDate,
            category,
        }

        updateProjectList(values)
        await apiPostProject(values)
        setSubmiting(false)
        onClose()
    }

    return (
        <div className="max-h-[70vh] overflow-y-auto px-4 py-2">
            <Form
                onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log('validation error', errors)
                })}
            >
                <FormItem
                    label="Company Name"
                    invalid={Boolean(errors.title)}
                    errorMessage={errors.title?.message}
                >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <Input type="text" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Company Size"
                    invalid={Boolean(errors.title)}
                    errorMessage={errors.companySize?.message}
                >
                    <Controller
                        name="companySize"
                        control={control}
                        render={({ field }) => (
                            <Input type="text" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="PIC Name"
                    invalid={Boolean(errors.title)}
                    errorMessage={errors.picName?.message}
                >
                    <Controller
                        name="picName"
                        control={control}
                        render={({ field }) => (
                            <Input type="text" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="WhatsApp Number"
                    invalid={Boolean(errors.picWhatsapp)}
                    errorMessage={errors.picWhatsapp?.message}
                >
                    <Controller
                        name="picWhatsapp"
                        control={control}
                        render={({ field }) => (
                            <Input type="text" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.picEmail)}
                    errorMessage={errors.picEmail?.message}
                >
                    <Controller
                        name="picEmail"
                        control={control}
                        render={({ field }) => (
                            <Input type="email" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="PIC Role"
                    invalid={Boolean(errors.picRole)}
                    errorMessage={errors.picRole?.message}
                >
                    <Controller
                        name="picRole"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isMulti
                                options={picRoleOptions}
                                value={picRoleOptions.filter((opt) =>
                                    field.value.includes(opt.value),
                                )}
                                onChange={(val) =>
                                    field.onChange(val.map((v) => v.value))
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Category"
                    invalid={Boolean(errors.category)}
                    errorMessage={errors.category?.message}
                >
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isMulti
                                options={categoryOptions}
                                value={categoryOptions.filter((opt) =>
                                    field.value.includes(opt.value),
                                )}
                                onChange={(val) =>
                                    field.onChange(val.map((v) => v.value))
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Current System"
                    invalid={Boolean(errors.currentSystem)}
                    errorMessage={errors.currentSystem?.message}
                >
                    <Controller
                        name="currentSystem"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isMulti
                                options={currentSystemOptions}
                                value={currentSystemOptions.filter((opt) =>
                                    field.value.includes(opt.value),
                                )}
                                onChange={(val) =>
                                    field.onChange(val.map((v) => v.value))
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="System Requirements"
                    invalid={Boolean(errors.systemRequirement)}
                    errorMessage={errors.systemRequirement?.message}
                >
                    <Controller
                        name="systemRequirement"
                        control={control}
                        render={({ field }) => (
                            <Select
                                isMulti
                                options={systemRequirementOptions}
                                value={systemRequirementOptions.filter((opt) =>
                                    field.value.includes(opt.value),
                                )}
                                onChange={(val) =>
                                    field.onChange(val.map((v) => v.value))
                                }
                            />
                        )}
                    />
                </FormItem>

                <FormItem
                    label="Budget"
                    invalid={Boolean(errors.title)}
                    errorMessage={errors.companySize?.message}
                >
                    <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                            <Input type="text" autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Meeting Date"
                    invalid={!!errors.meetingDate}
                    errorMessage={errors.meetingDate?.message}
                >
                    <Controller
                        name="meetingDate"
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

                <FormItem
                    label="Notes"
                    invalid={Boolean(errors.notes)}
                    errorMessage={errors.notes?.message}
                >
                    <Controller
                        name="notes"
                        control={control}
                        render={({ field }) => (
                            <Input textArea autoComplete="off" {...field} />
                        )}
                    />
                </FormItem>
                <NewTaskField onAddNewTask={handleAddNewTask} />
                <Button
                    block
                    variant="solid"
                    type="submit"
                    loading={isSubmiting}
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default NewProjectForm
