import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import OverviewSection from './OverviewSection'
import AddressSection from './AddressSection'
import TagsSection from './TagsSection'
import AccountSection from './AccountSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { CustomerFormSchema } from './types'
import Card from '@/components/ui/Card'
import { FaWhatsapp, FaLinkedin, FaEnvelope } from 'react-icons/fa'

type CustomerFormProps = {
    onFormSubmit: (values: CustomerFormSchema) => void
    newCustomer?: boolean
    defaultValues?: CustomerFormSchema
} & CommonProps

const validationSchema: ZodType<CustomerFormSchema> = z
    .object({
        // OverviewFields
        name: z.string().min(1, { message: 'Company Name required' }),
        category: z.array(z.string()).optional(),
        companySize: z.string().min(1, { message: 'Company Size required' }),
        notes: z.string().min(1, { message: 'Content required' }),
        desc: z.string().min(1),

        // TaskFields
        attachmentCount: z.number().optional(),
        totalTask: z.number().min(0),
        completedTask: z.number().min(0),
        dayleft: z.number().optional(),
        favourite: z.boolean().optional(),

        // PicField
        picName: z.string().min(1, { message: 'PIC Name required' }),
        picRole: z
            .array(z.string())
            .min(1, { message: 'At least 1 role required' }),

        // SystemField
        currentSystem: z
            .array(z.string())
            .min(1, { message: 'Please describe the current system' }),
        systemRequirement: z
            .array(z.string())
            .min(1, { message: 'Please provide your requirements' }),
        budget: z.number().min(0, { message: 'Please provide a valid budget' }),
    })
    .strip()

const CustomerForm = (props: CustomerFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newCustomer = false,
        children,
    } = props

    const emptyCustomerForm: CustomerFormSchema = {
        ...defaultValues,
        name: '',
        companySize: '',
        notes: '',
        picName: '',
        picRole: [''],
        currentSystem: [''],
        systemRequirement: [''],
        budget: 0,
        totalTask: 0,
        completedTask: 0,
        desc: '',
    }

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        watch,
    } = useForm<CustomerFormSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema),
    })

    const formValues = watch()
    console.log('formValues', formValues)

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            console.log('Resetting form with default values:', defaultValues)
            const mergedDefaults = { ...emptyCustomerForm, ...defaultValues }
            const parse = validationSchema.safeParse(
                mergedDefaults.customerData,
            )
            if (parse.success) {
                reset(parse.data)
            } else {
                console.error('Invalid merged defaults:', parse.error.format())
            }
        }
    }, [defaultValues, reset])

    const onSubmit = (values: CustomerFormSchema) => {
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        {!isEmpty(defaultValues) && (
                            <OverviewSection
                                control={control}
                                errors={errors}
                            />
                        )}

                        <AddressSection control={control} errors={errors} />
                    </div>
                    <div className="md:w-[370px] gap-4 flex flex-col">
                        <TagsSection control={control} errors={errors} />
                        {!newCustomer && (
                            <AccountSection control={control} errors={errors} />
                        )}
                        <Card>
                            <h4 className="text-lg font-semibold">
                                Contact Info
                            </h4>
                            <div className="space-y-4  text-sm text-gray-700">
                                {/* WhatsApp */}
                                <div className="flex items-center gap-2">
                                    <FaWhatsapp className="text-green-500" />
                                    <a
                                        href="https://wa.me/628123456789"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        Chat on WhatsApp
                                    </a>
                                </div>

                                {/* LinkedIn */}
                                <div className="flex items-center gap-2">
                                    <FaLinkedin className="text-blue-600" />
                                    <a
                                        href="https://linkedin.com/in/yourusername"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        linkedin.com/in/yourusername
                                    </a>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-2">
                                    <FaEnvelope className="text-red-500" />
                                    <a
                                        href="mailto:your@email.com"
                                        className="hover:underline"
                                    >
                                        your@email.com
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}
export default CustomerForm
