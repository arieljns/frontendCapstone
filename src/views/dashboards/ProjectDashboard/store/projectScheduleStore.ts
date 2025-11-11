import { create } from 'zustand'
import type { Event } from '../types'

export type ProjectScheduleEvent = {
    id: string
    type: Event
    label: string
    time?: string
}

type ProjectScheduleState = {
    eventsByDate: Record<string, ProjectScheduleEvent[]>
}

type ProjectScheduleActions = {
    addEvent: (dateKey: string, event: ProjectScheduleEvent) => void
    clearEvents: (dateKey: string) => void
    reset: () => void
}

export const useProjectScheduleStore = create<
    ProjectScheduleState & ProjectScheduleActions
>()((set) => ({
    eventsByDate: {},
    addEvent: (dateKey, event) =>
        set((state) => {
            const existingEvents = state.eventsByDate[dateKey] ?? []
            return {
                eventsByDate: {
                    ...state.eventsByDate,
                    [dateKey]: [...existingEvents, event],
                },
            }
        }),
    clearEvents: (dateKey) =>
        set((state) => {
            if (!state.eventsByDate[dateKey]) {
                return state
            }
            const { [dateKey]: _, ...rest } = state.eventsByDate
            return {
                eventsByDate: rest,
            }
        }),
    reset: () =>
        set(() => ({
            eventsByDate: {},
        })),
}))
