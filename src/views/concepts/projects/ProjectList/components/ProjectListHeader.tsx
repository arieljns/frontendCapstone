import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import NewProjectForm from './NewProjectForm'

import UploadFile from '@/views/concepts/files/FileManager/components/UploadFile'

type ProjectListHeaderProps = {
    options: boolean
}

export const ProjectListHeader = ({ options }: ProjectListHeaderProps) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    return (
        <>
            {options ? (
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h3>After Meetings</h3>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h3>Meeting Feature</h3>
                    <div className="flex items-center justify-between gap-3">
                        <UploadFile />
                        <Button
                            variant="solid"
                            onClick={() => setDialogOpen(true)}
                        >
                            Create Meeting
                        </Button>
                    </div>
                </div>
            )}

            <Dialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)}>
                <h4>Create New Meeting</h4>
                <div className="mt-4">
                    <NewProjectForm onClose={() => setDialogOpen(false)} />
                </div>
            </Dialog>
        </>
    )
}

export default ProjectListHeader
