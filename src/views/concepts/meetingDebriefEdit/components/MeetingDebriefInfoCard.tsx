import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'
import Card from '@/components/ui/Card'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {
    apiCloseMeeting,
    apiGetMeetingDebrief,
} from '@/services/DashboardService'
import { AgreementResponse } from '../../orders/OrderList/types'
import { Button } from '@/components/ui'
import { HiOutlineDocumentReport } from 'react-icons/hi'

export interface MeetingDebriefInfoCardProps {
    companyName: string
    picName: string
    picRole: string
    picWhatsapp: string
    picEmail: string
    onCloseMeeting?: () => void
}

type InfoFieldProps = {
    label: string
    value: string
}

const InfoField = ({ label, value }: InfoFieldProps) => (
    <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            {label}
        </p>
        <p className="heading-text text-sm font-semibold text-gray-900">
            {value?.trim() || '—'}
        </p>
    </div>
)

const MeetingDebriefInfoCard = ({
    companyName,
    picName,
    picRole,
    picWhatsapp,
    picEmail,
    onCloseMeeting,
}: MeetingDebriefInfoCardProps) => {
    const params = useParams()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isClosingMeeting, setIsClosingMeeting] = useState(false)

    const { data } = useSWR<AgreementResponse[]>('/after', apiGetMeetingDebrief)
    const debriefInfo = data?.find((d) => {
        return d.id === Number(params?.id)
    })

    const handleCloseMeetingClick = () => {
        setIsDialogOpen(true)
    }

    const handleCancelCloseMeeting = () => {
        if (isClosingMeeting) return
        setIsDialogOpen(false)
    }

    const handleConfirmCloseMeeting = async () => {
        if (!params?.id) {
            toast.push(
                <Notification type="warning">
                    Unable to close this meeting because the ID is missing.
                </Notification>,
            )
            setIsDialogOpen(false)
            return
        }

        try {
            setIsClosingMeeting(true)
            await apiCloseMeeting(debriefInfo?.beforeMeeting.id)
            toast.push(
                <Notification type="success">
                    meeting is closed and sent to airtable
                </Notification>,
            )
            onCloseMeeting?.()
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Failed to close meeting', error)
            toast.push(
                <Notification type="danger">
                    Failed to close the meeting. Please try again.
                </Notification>,
            )
        } finally {
            setIsClosingMeeting(false)
        }
    }

    return (
        <>
            <Card className="w-full max-w-sm bg-white shadow-sm">
                <div className="flex h-full flex-col gap-6 p-6">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            Meeting Debrief
                        </p>
                        <h3 className="heading-text mt-2 text-lg font-semibold text-gray-900">
                            Company Info
                        </h3>
                        <p className="text-sm text-gray-600">
                            Snapshot of the key stakeholders attending this
                            meeting.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <InfoField
                            label="Company Name"
                            value={
                                debriefInfo?.beforeMeeting?.name || companyName
                            }
                        />
                        <InfoField
                            label="PIC Name"
                            value={
                                debriefInfo?.beforeMeeting?.picName || picName
                            }
                        />
                        <InfoField
                            label="PIC Role"
                            value={
                                debriefInfo?.beforeMeeting?.picRole?.[0] ||
                                picRole
                            }
                        />
                        <InfoField
                            label="PIC WhatsApp"
                            value={
                                debriefInfo?.beforeMeeting?.picWhatsapp ||
                                picWhatsapp
                            }
                        />
                        <InfoField
                            label="PIC Email"
                            value={
                                debriefInfo?.beforeMeeting?.picEmail || picEmail
                            }
                        />
                    </div>

                    <Button className="flex items-center">
                        <HiOutlineDocumentReport />
                        <Link to={`/concepts/quotation/${debriefInfo?.beforeMeeting?.id}`}>
                            <h6 className="text-xs">Generate Invoice</h6>
                        </Link>
                    </Button>

                    <Button
                        type="button"
                        onClick={handleCloseMeetingClick}
                        disabled={isClosingMeeting}
                        className="mt-auto w-full rounded-xl bg-[#f22929] px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-[#d51f1f] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isClosingMeeting ? 'Closing...' : 'Close Meeting'}
                    </Button>
                </div>
            </Card>

            <ConfirmDialog
                isOpen={isDialogOpen}
                type="danger"
                title="Close this meeting?"
                onClose={handleCancelCloseMeeting}
                onCancel={handleCancelCloseMeeting}
                onConfirm={handleConfirmCloseMeeting}
                cancelText="Cancel"
                confirmText="Delete"
                cancelButtonProps={{
                    disabled: isClosingMeeting,
                }}
                confirmButtonProps={{
                    loading: isClosingMeeting,
                    disabled: isClosingMeeting,
                    customColorClass: ({ unclickable }) =>
                        `${
                            unclickable
                                ? 'bg-red-400 text-white'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`,
                }}
            >
                <p className="text-sm text-gray-600">
                    This will close the meeting and send the record to Airtable.
                    You can&apos;t undo this action.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default MeetingDebriefInfoCard
