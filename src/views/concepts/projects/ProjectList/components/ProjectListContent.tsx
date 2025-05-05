import Card from '@/components/ui/Card'
import { Link } from 'react-router-dom'
import ProgressionBar from './ProgressionBar'
import { useProjectListStore } from '../store/projectListStore'
import { apiGetProjects, apiDeleteProject } from '@/services/ProjectService'
import useSWR from 'swr'
import { TbClipboardCheck, TbTrash } from 'react-icons/tb'
import type { GetProjectListResponse } from '../types'
import { Button } from '@/components/ui'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { useState } from 'react'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import toast from '@/components/ui/toast'

type ProjectListContentProps = {
    type: string
}

export const ProjectListContent = ({ type }: ProjectListContentProps) => {
    const { projectList, setProjectList } = useProjectListStore()
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [discardId, setDiscardId] = useState('')

    useSWR(['/api/projects'], () => apiGetProjects<GetProjectListResponse>(), {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        onSuccess: (data) => {
            setProjectList(data)
        },
    })

    const handleConfirmDiscard = () => {
        apiDeleteProject({ id: discardId })
        setDiscardConfirmationOpen(false)
        toast.push(
            <Notification type="success">Customer discardd!</Notification>,
            { placement: 'top-center' },
        )
    }

    const handleDiscard = (id: string) => {
        setDiscardConfirmationOpen(true)
        setDiscardId(id)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <div>
            <div className="mt-8">
                <h5 className="mb-3">Favorite</h5>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {projectList.map((project) => (
                        <Card key={project.id} bodyClass="h-full">
                            <div className="flex flex-col justify-between h-full">
                                {type == 'before' ? (
                                    <div className="flex justify-between items-center">
                                        {' '}
                                        <Link
                                            to={`/concepts/customers/customer-details/${project.id}`}
                                        >
                                            <div className="flex items-center justify-around">
                                                <h6 className="font-bold hover:text-primary">
                                                    {project.name}
                                                </h6>
                                            </div>
                                        </Link>{' '}
                                        <TbTrash
                                            size={20}
                                            onClick={() =>
                                                handleDiscard(project.id)
                                            }
                                            className="text-gray-400 hover:text-red-500 cursor-pointer"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        {' '}
                                        <Link
                                            to={`/concepts/orders/order-create/`}
                                        >
                                            <h6 className="font-bold hover:text-primary">
                                                {project.name}
                                            </h6>
                                        </Link>{' '}
                                    </div>
                                )}

                                <p className="mt-4">{project.desc}</p>
                                <div className="mt-3">
                                    <ProgressionBar
                                        progression={project.progression}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center rounded-full font-semibold text-xs">
                                            <div className="flex  items-center px-2 py-1 border border-gray-300 rounded-full">
                                                <TbClipboardCheck className="text-base" />
                                                <span className="ml-1 rtl:mr-1 whitespace-nowrap">
                                                    {project.completedTask} /{' '}
                                                    {project.totalTask}
                                                </span>
                                            </div>
                                            {type == 'after' && (
                                                <div className="mx-2 ">
                                                    <Button className="flex items-center">
                                                        <HiOutlineDocumentReport />
                                                        <Link
                                                            to={`/concepts/quotation`}
                                                        >
                                                            <h6 className="text-xs">
                                                                Generate Invoice
                                                            </h6>
                                                        </Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
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
                    Are you sure you want discard this meeting {discardId}? This
                    action can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </div>
    )
}

export default ProjectListContent
