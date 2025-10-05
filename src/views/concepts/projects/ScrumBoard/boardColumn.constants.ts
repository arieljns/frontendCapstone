import { Ticket } from './types'

// ordered columns in the board
export const columnTitle = [
    'Quotation Sent',
    'Follow Up',
    'Negotiation',
    'Decision Pending',
    'Closed Won',
    'Closed Lost',
]

export const columnsContent: Record<string, Ticket[]> = {
    'Quotation Sent': [],
    'Follow Up': [],
    Negotiation: [
        {
            id: '3',
            name: 'Enterprise LMN',
            description: 'Sent quotation for 100 seats SaaS plan',
            cover: '/images/enterprise-lmn.png',
            members: [
                { id: 'm3', name: 'Sales Rep C', avatar: '/avatars/c.png' },
            ],
            labels: ['bug'],
            attachments: [
                {
                    id: 'att2',
                    name: 'Quotation.pdf',
                    src: '/files/quotation-lmn.pdf',
                    size: '320KB',
                },
            ],
            comments: [
                {
                    id: 'c3',
                    text: 'Follow up in 3 days',
                    author: 'Sales Manager',
                },
            ],
            dueDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
        },
    ],
    'Closed Won': [
        {
            id: '4',
            name: 'Retail OPQ',
            description: 'Signed contract for POS system',
            cover: '/images/retail-opq.png',
            members: [
                { id: 'm1', name: 'Sales Rep A', avatar: '/avatars/a.png' },
            ],
            labels: ['success'],
            attachments: [],
            comments: [
                { id: 'c4', text: 'Deal closed 🎉', author: 'Sales Rep A' },
            ],
            dueDate: null,
        },
    ],
    'Closed Lost': [],
}
