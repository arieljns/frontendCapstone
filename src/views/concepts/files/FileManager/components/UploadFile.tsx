import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Upload from '@/components/ui/Upload'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import UploadMedia from '@/assets/svg/UploadMedia'
import sleep from '@/utils/sleep'
import { FaFileCsv } from 'react-icons/fa'
import Papa from 'papaparse'
import { useProjectListStore } from '@/views/concepts/projects/ProjectList/store/projectListStore'
import { GetProjectListResponse } from '@/views/concepts/projects/ProjectList/types'
import { apiPostCsvData } from '@/services/ProjectService'

const UploadFile = () => {
    const { setProjectList } = useProjectListStore()
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [parsedData, setParsedData] = useState<any[]>([])

    const handleUploadDialogClose = () => {
        setUploadDialogOpen(false)
    }

    const handleFileChange = (newFileList: File[], oldFileList: File[]) => {
        console.log('Old files:', oldFileList)
        console.log('New files:', newFileList)

        setUploadedFiles(newFileList)

        if (newFileList.length > 0) {
            const fileToParse = newFileList[0]

            Papa.parse(fileToParse, {
                header: true,
                delimiter: ';',
                skipEmptyLines: true,
                complete: (results) => {
                    console.log('Raw parsed rows:', results.data)

                    // transform each row into DTO shape
                    const transformed = results.data.map((row: any) => ({
                        name: row.name?.trim() || '',
                        desc: row.desc?.trim() || '',
                        totalTask: !isNaN(Number(row.totalTask))
                            ? Number(row.totalTask)
                            : 0,
                        completedTask: !isNaN(Number(row.completedTask))
                            ? Number(row.completedTask)
                            : 0,
                        companySize: row.companySize || '',
                        picName: row.picName || '',
                        picRole: row.picRole ? [row.picRole] : [],
                        notes: row.notes || '',
                        currentSystem: row.currentSystem
                            ? [row.currentSystem]
                            : [],
                        systemRequirement: row.systemRequirement
                            ? [row.systemRequirement]
                            : [],
                        budget: !isNaN(Number(row.budget))
                            ? Number(row.budget)
                            : 0,
                        category: row.category ? [row.category] : [],
                        meetingDate: row.meetingDate
                            ? new Date(
                                  row.meetingDate
                                      .split('/')
                                      .reverse()
                                      .join('-'),
                              )
                            : null,
                    }))

                    console.log('Transformed rows:', transformed)
                    setParsedData(transformed)
                    setProjectList(transformed as GetProjectListResponse)
                },
                error: (error: Error) => {
                    console.error('Error parsing CSV:', error)
                },
            })
        }
    }

    const handleUpload = async () => {
        console.log('this is the parsed data', parsedData)
        await apiPostCsvData(parsedData)
        setIsUploading(true)
        await sleep(500)
        handleUploadDialogClose()
        setIsUploading(false)
        toast.push(
            <Notification title={'Successfully uploaded'} type="success" />,
            { placement: 'top-center' },
        )
    }

    return (
        <>
            <Button
                className="flex gap-1 items-center "
                variant="default"
                onClick={() => setUploadDialogOpen(true)}
            >
                <FaFileCsv size={18} />
                <div>
                    Upload From <span className="text-green-600">CSV</span>
                </div>
            </Button>
            <Dialog
                isOpen={uploadDialogOpen}
                onClose={handleUploadDialogClose}
                onRequestClose={handleUploadDialogClose}
            >
                <h4>Upload Files</h4>
                <Upload
                    draggable
                    className="mt-6 bg-gray-100"
                    onChange={handleFileChange}
                    onFileRemove={setUploadedFiles}
                >
                    <div className="my-4 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <UploadMedia height={150} width={200} />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Drop your files here, or{' '}
                            </span>
                            <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 font-semibold opacity-60 dark:text-white">
                            through your machine
                        </p>
                    </div>
                </Upload>
                <div className="mt-4">
                    <Button
                        block
                        loading={isUploading}
                        variant="solid"
                        disabled={uploadedFiles.length === 0}
                        onClick={handleUpload}
                    >
                        upload
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default UploadFile
