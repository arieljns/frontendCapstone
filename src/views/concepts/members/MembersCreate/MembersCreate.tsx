import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form } from '@/components/ui/Form'
import toast from '@/components/ui/toast'
import MemberFormFields from './MemberFormFields'
import { memberSchema, defaultMemberValues } from './memberFormConfig'
import type { MemberFormValues } from './memberFormConfig'
import { TbTrash } from 'react-icons/tb'
import { apiSignUp } from '@/services/AuthService'

const MembersCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<MemberFormValues>({
        defaultValues: defaultMemberValues,
        resolver: zodResolver(memberSchema),
    })

    const handleFormSubmit = async (values: MemberFormValues) => {
        try {
            const submitted = await apiSignUp(values)
            console.log('value being submit: ', submitted)
            setIsSubmitting(true)
            setIsSubmitting(false)
            toast.push(
                <Notification type="success">Member created!</Notification>,
                { placement: 'top-center' },
            )
        } catch (error) {
            console.error(error)
            toast.push(
                <Notification type="danger">error happened</Notification>,
                {
                    placement: 'top-center',
                },
            )
        }

        navigate('/concepts/members')
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(false)
        reset(defaultMemberValues)
        toast.push(
            <Notification type="success">Member discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/members')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <Form
                className="flex w-full h-full"
                containerClassName="flex flex-col w-full justify-between"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <Card className="p-8">
                            <h4 className="mb-6 text-lg font-semibold">
                                Member Information
                            </h4>
                            <MemberFormFields
                                control={control}
                                errors={errors}
                            />
                        </Card>
                    </div>
                </Container>
                <BottomStickyBar>
                    <Container>
                        <div className="flex items-center justify-between px-8">
                            <span></span>
                            <div className="flex items-center">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    customColorClass={() =>
                                        'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                    }
                                    icon={<TbTrash />}
                                    onClick={handleDiscard}
                                >
                                    Discard
                                </Button>
                                <Button
                                    variant="solid"
                                    type="submit"
                                    loading={isSubmitting}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    </Container>
                </BottomStickyBar>
            </Form>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want to discard this? This action
                    can&apos;t be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default MembersCreate
