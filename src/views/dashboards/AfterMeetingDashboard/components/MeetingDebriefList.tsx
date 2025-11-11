import Card from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import ProgressionBar from '../../../concepts/projects/ProjectList/components/ProgressionBar'
import { useProjectListStore } from '../../../concepts/projects/ProjectList/store/projectListStore'
import {
    apiGetProjects,
    apiDeleteProject,
    apiMoveMeetingStage,
} from '@/services/ProjectService'
import useSWR from 'swr'
import {
    TbClipboardCheck,
    TbTrash,
    TbUserCheck,
    TbRepeat,
} from 'react-icons/tb'
import type { GetProjectListResponse } from '@/views/concepts/projects/ProjectList/types'
import { Button, Dropdown, Pagination } from '@/components/ui'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { useState } from 'react'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import toast from '@/components/ui/toast'

const MeetingDebriefList = () => {
    const { projectList, setProjectList } = useProjectListStore()
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [discardId, setDiscardId] = useState('')
    const [meetingId, setMeetingId] = useState('')
    const [stageConfirmationOpen, setStageConfirmationOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6

    useSWR(['/api/projects'], () => apiGetProjects<GetProjectListResponse>(), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        onSuccess: (data) => {
            setProjectList(data)
        },
    })

    const handleConfirmDiscard = () => {
        setProjectList((prev) => prev.filter((p) => p.id !== discardId))
        apiDeleteProject({ id: discardId })
        setDiscardConfirmationOpen(false)
        toast.push(
            <Notification type="success">Customer discarded!</Notification>,
            { placement: 'top-center' },
        )
    }
    const handleDiscard = (id: string) => {
        setDiscardId(id)
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    const handleCancelMoveStage = () => {
        setStageConfirmationOpen(false)
    }

    const handleMoveStage = (id: string) => {
        setStageConfirmationOpen(true)
        setMeetingId(id)
    }

    const handleConfrimStage = () => {
        setStageConfirmationOpen(false)
        apiMoveMeetingStage({ id: meetingId })
        toast.push(
            <Notification type="success">Move to the next stage</Notification>,
            { placement: 'top-center' },
        )
    }

    const getCategoryColor = (category: string[]) => {
        const key = (category[0] || 'default').toLowerCase()

        const colorMap: Record<string, string> = {
            service: 'bg-blue-500',
            retail: 'bg-green-500',
            marketing: 'bg-purple-500',
            sales: 'bg-yellow-500',
            support: 'bg-red-500',
            default: 'bg-gray-500',
        }

        return colorMap[key] || colorMap.default
    }

    const meetingStage = projectList.filter(
        (project) => project.isMeetingStage === true,
    )
    const total = meetingStage.length
    const paginatedData = meetingStage.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    )
    return (
        <div>
            <div className="mt-8">
                <h5 className="mb-3">Favorite</h5>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 bottom-5 gap-6">
                    {paginatedData.map((project) => (
                        <Card
                            key={project.id}
                            bodyClass="h-full flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-center relative">
                                <div
                                    className={`${getCategoryColor(project.category)} text-white text-center p-1 w-fit rounded-lg mb-1`}
                                >
                                    {project.category}
                                </div>

                                <Dropdown>
                                    <Dropdown.Item
                                        className="flex items-center "
                                        onClick={() =>
                                            handleDiscard(project.id)
                                        }
                                    >
                                        <TbTrash size={16} className="mr-2" />
                                        Delete
                                    </Dropdown.Item>
                                    {project.isMeetingStage === false && (
                                        <Dropdown.Item
                                            className="flex items-center "
                                            onClick={() =>
                                                handleMoveStage(project.id)
                                            }
                                        >
                                            <TbRepeat
                                                size={16}
                                                className="mr-2"
                                            />
                                            Move Meeting Stage
                                        </Dropdown.Item>
                                    )}
                                </Dropdown>
                            </div>

                            <div className="flex flex-col justify-between h-full">
                                <div className="flex justify-between items-center">
                                    <Link
                                        to={`/concepts/orders/order-create/${project.id}`}
                                    >
                                        <h6 className="font-bold hover:text-primary">
                                            {project.name}
                                        </h6>
                                    </Link>
                                </div>

                                <p className="mt-1">{project.desc}</p>
                                <div className="mt-1">
                                    <ProgressionBar
                                        progression={project.progression}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center rounded-full font-semibold text-xs">
                                            <div className="flex items-center px-2 py-1 border border-gray-300 rounded-full">
                                                <TbClipboardCheck className="text-base" />
                                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                                    {project.completedTask} /{' '}
                                                    {project.totalTask}
                                                </span>
                                            </div>

                                            <div className="mx-2">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <hr className="border-gray-200" />
                                    <div className="flex items-center gap-2">
                                        <TbUserCheck />
                                        {
                                            new Date(project.meetingDate)
                                                .toISOString()
                                                .split('T')[0]
                                        }
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
                {total > pageSize && (
                    <div className="flex justify-center mt-8">
                        <Pagination
                            total={total}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onChange={(page) => setCurrentPage(page)}
                            displayTotal
                        />
                    </div>
                )}
            </div>

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
                    Are you sure you want to discard this meeting {discardId}?
                    This action can&apos;t be undone.
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                isOpen={stageConfirmationOpen}
                type="info"
                title="Move To The Next Stage"
                onClose={handleCancelMoveStage}
                onRequestClose={handleCancelMoveStage}
                onCancel={handleCancelMoveStage}
                onConfirm={handleConfrimStage}
            >
                <p>
                    Stage move is for the meeting that already take place, are
                    you sure you want to continue?
                </p>
            </ConfirmDialog>
        </div>
    )
}

export default MeetingDebriefList
