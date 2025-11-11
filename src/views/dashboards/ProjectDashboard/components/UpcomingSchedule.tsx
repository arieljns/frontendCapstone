import { useState, useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import Calendar from '@/components/ui/Calendar'
import ScrollBar from '@/components/ui/ScrollBar'
import CreateEventDialog, { eventTypes } from './CreateEventDialog'
import { eventGenerator, isToday } from '../utils'
import classNames from '@/utils/classNames'
import { useProjectScheduleStore } from '../store/projectScheduleStore'

import dayjs from 'dayjs'
import type { FormSchema as CreateEventPayload } from './CreateEventDialog'
import type { Event } from '../types'

type ScheduledEvent = {
    id: string
    type: Event
    label: string
    time?: Date
}

type ScheduledEventProps = ScheduledEvent

const ScheduledEvent = (props: ScheduledEventProps) => {
    const { type, label, time } = props

    const event = eventTypes[type]

    return (
        <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-3">
                <div>
                    <Avatar
                        className={classNames('text-gray-900', event?.color)}
                        icon={event?.icon}
                        shape="round"
                    />
                </div>
                <div>
                    <div className="font-bold heading-text">{label}</div>
                    <div className="font-normal">{event?.label}</div>
                </div>
            </div>
            <div>
                <span className="font-semibold heading-text">
                    {time && dayjs(time).format('hh:mm')}{' '}
                </span>
                <small>{time && dayjs(time).format('A')}</small>
            </div>
        </div>
    )
}

const UpcomingSchedule = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        dayjs().toDate(),
    )
    const eventsByDate = useProjectScheduleStore((state) => state.eventsByDate)
    const addEvent = useProjectScheduleStore((state) => state.addEvent)
    const displayDate = selectedDate ?? dayjs().toDate()

    const eventList = useMemo(() => {
        const date = selectedDate ?? dayjs().toDate()
        const dateKey = dayjs(date).format('YYYY-MM-DD')
        const storedEvents =
            eventsByDate[dateKey]?.map((event) => ({
                ...event,
                time: event.time ? dayjs(event.time).toDate() : undefined,
            })) ?? []
        const eventList = [
            ...eventGenerator(date),
            ...storedEvents,
        ]

        return eventList.sort((a, b) => {
            if (!a.time && !b.time) {
                return 0
            }
            if (!a.time) {
                return 1
            }
            if (!b.time) {
                return -1
            }
            return a.time.getTime() - b.time.getTime()
        })
    }, [selectedDate, eventsByDate])

    const handleCreateEvent = (value: CreateEventPayload & { id: string }) => {
        const baseDate = selectedDate ?? dayjs().toDate()
        const dateKey = dayjs(baseDate).format('YYYY-MM-DD')
        const time = dayjs(baseDate)
            .set('hour', value.time)
            .set('minute', 0)
            .set('second', 0)
            .set('millisecond', 0)
            .toISOString()

        addEvent(dateKey, {
            id: value.id,
            label: value.label,
            type: value.type,
            time,
        })
    }

    return (
        <Card>
            <div className="flex flex-col md:flex-row xl:flex-col md:gap-10 xl:gap-0 mb-4">
                <div className="flex items-center mx-auto w-[280px]">
                    <Calendar
                        value={displayDate}
                        onChange={(val) => {
                            setSelectedDate(val)
                        }}
                    />
                </div>
                <div className="w-full">
                    <div className="my-6">
                        <h5>
                            Scehdule{' '}
                            {isToday(displayDate)
                                ? 'today'
                                : dayjs(displayDate).format('DD MMM')}
                        </h5>
                    </div>
                    <div className="w-full">
                        <ScrollBar className="overflow-y-auto h-[280px] xl:max-w-[280px]">
                            <div className="flex flex-col gap-4">
                                {eventList.map((event) => (
                                    <ScheduledEvent key={event.id} {...event} />
                                ))}
                            </div>
                        </ScrollBar>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <CreateEventDialog onCreateEvent={handleCreateEvent} />
            </div>
        </Card>
    )
}

export default UpcomingSchedule
