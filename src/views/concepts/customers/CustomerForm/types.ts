import type { Control, FieldErrors } from 'react-hook-form'

export type OverviewFields = {
    name: string
    category?: string[]
    companySize: string
    notes: string
    desc: string
}

export type TaskFields = {
    attachmentCount?: number
    totalTask: number
    completedTask: number

    dayleft?: number
    favourite?: boolean
}

export type PicField = {
    picName: string
    picRole: string[]
}

export type SystemField = {
    currentSystem: string[]
    systemRequirement: string[]
    budget: number
}

export type CustomerFormSchema = OverviewFields &
    TaskFields &
    PicField &
    SystemField

export type FormSectionBaseProps = {
    control: Control<CustomerFormSchema>
    errors: FieldErrors<CustomerFormSchema>
}
