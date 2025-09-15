export type Project = {
    id: string
    name: string
    category: string[]
    desc: string
    attachmentCount?: number
    totalTask: number
    completedTask: number
    progression: number
    dayleft?: number
    favourite?: boolean
    companySize: string
    notes: string
    picName: string
    picRole: string[]
    currentSystem: string[]
    systemRequirement: string[]
    budget: number
    meetingDate: Date
    isMeetingStage: boolean
}

export type ProjectList = Project[]

export type GetProjectListResponse = ProjectList
