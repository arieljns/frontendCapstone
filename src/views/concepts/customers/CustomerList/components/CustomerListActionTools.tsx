import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Notification from '@/components/ui/Notification'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import useCustomerList from '../hooks/useCustomerList'
import { CSVLink } from 'react-csv'
import toast from '@/components/ui/toast'
import sleep from '@/utils/sleep'
import MemberFormFields from '@/views/concepts/members/MembersCreate/MemberFormFields'
import {
    defaultMemberValues,
    memberSchema,
} from '@/views/concepts/members/MembersCreate/memberFormConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import type { MemberFormValues } from '@/views/concepts/members/MembersCreate/memberFormConfig'
import { apiSignUp } from '@/services/AuthService'
const CustomerListActionTools = () => {
    const { customerList } = useCustomerList()
    const [dialogOpen, setDialogOpen] = useState(false)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<MemberFormValues>({
        defaultValues: defaultMemberValues,
        resolver: zodResolver(memberSchema),
    })

    const handleDialogClose = () => {
        setDialogOpen(false)
        reset(defaultMemberValues)
    }

    const handleFormSubmit = async (values: MemberFormValues) => {
        console.log('Submitted member values', values)
        await apiSignUp(values)

        toast.push(
            <Notification type="success">Member created!</Notification>,
            { placement: 'top-center' },
        )

        handleDialogClose()
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-3">
                <CSVLink
                    className="w-full"
                    filename="customerList.csv"
                    data={customerList}
                >
                    <Button
                        icon={<TbCloudDownload className="text-xl" />}
                        className="w-full"
                    >
                        Download
                    </Button>
                </CSVLink>
                <Button
                    variant="solid"
                    icon={<TbUserPlus className="text-xl" />}
                    onClick={() => setDialogOpen(true)}
                >
                    Add new
                </Button>
            </div>
            <Dialog isOpen={dialogOpen} onClose={handleDialogClose}>
                <h4 className="text-lg font-semibold">Add New Member</h4>
                <p className="mt-1 text-sm text-gray-500">
                    Enter member credentials to complete the registration.
                </p>
                <form
                    className="mt-6 space-y-6"
                    onSubmit={handleSubmit(handleFormSubmit)}
                >
                    <MemberFormFields control={control} errors={errors} />
                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={handleDialogClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            type="submit"
                            loading={isSubmitting}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            </Dialog>
        </>
    )
}

export default CustomerListActionTools
