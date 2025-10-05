import type { Ticket } from './types'

export const createUID = (len: number) => {
    const buf = [],
        chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length,
        length = len || 32

    for (let i = 0; i < length; i++) {
        buf[i] = chars.charAt(Math.floor(Math.random() * charlen))
    }
    return buf.join('')
}

export const createCardObject = (): Ticket => {
    return {
        id: createUID(10),
        name: 'Untitled Card',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        cover: '',
        members: [],
        labels: ['Task'],
        attachments: [],
        comments: [],
        dueDate: null,
    }
}

export const taskLabelColors: Record<string, string> = {
    Hot: 'bg-rose-200 dark:bg-rose-200 dark:text-gray-900',
    Medium: 'bg-blue-200 dark:bg-blue-200 dark:text-gray-900',
    Cold: 'bg-amber-200 dark:bg-amber-200 dark:text-gray-900',
}

export const labelList = ['Hot', 'Medium', 'Cold']
