import {
    DASHBOARDS_PREFIX_PATH,
    CONCEPTS_PREFIX_PATH,
} from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const dashboardsNavigationConfig: NavigationTree[] = [
    {
        key: 'dashboard',
        path: '',
        title: 'dashboard',
        translateKey: 'nav.dashboard.dashboard',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'default',
            },
        },
        subMenu: [
            {
                key: 'dashboard',
                path: `${DASHBOARDS_PREFIX_PATH}/ecommerce`,
                title: 'Dashboard',
                translateKey: 'nav.dashboard.ecommerce',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'dashboard.admin',
                path: `${DASHBOARDS_PREFIX_PATH}/admin/analytics`,
                title: 'Team Analytics',
                translateKey: 'nav.dashboard.admin',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'dashboard.funnel',
                path: `${DASHBOARDS_PREFIX_PATH}/funnel`,
                title: 'Sales Funnel',
                translateKey: 'nav.dashboard.funnel',
                icon: 'salesFunnel',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'dashboard.project',
                path: `${DASHBOARDS_PREFIX_PATH}/meeting-features`,
                title: 'Meeting Features',
                translateKey: 'nav.dashboard.project',
                icon: 'dashboardBeforeMeeting',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'dashboard.after.meeting',
                path: `${DASHBOARDS_PREFIX_PATH}/meeting-debrief`,
                title: 'Meeting Debrief',
                translateKey: 'nav.after-meeting',
                icon: 'dashboardAfterMeeting',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                meta: {
                    description: {
                        translateKey: 'nav.calendarDesc',
                        label: 'Schedule and events',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.ai.chat',
                path: `${CONCEPTS_PREFIX_PATH}/ai/chat`,
                title: 'AI Agent',
                translateKey: 'nav.conceptsAi.chat',
                icon: 'ai',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsAi.chatDesc',
                        label: 'AI-powered chat systems',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.products.productList',
                path: `${CONCEPTS_PREFIX_PATH}/members`,
                title: 'Team Members',
                translateKey: 'nav.members',
                icon: 'members',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                meta: {
                    description: {
                        translateKey: 'nav.members',
                        label: 'Manage Team Members',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.projects.kanban.board',
                path: `${CONCEPTS_PREFIX_PATH}/projects/scrum-board`,
                title: 'Kanban Board',
                translateKey: 'nav.conceptsProjects.scrumBoard',
                icon: 'projectScrumBoard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsProjects.scrumBoardDesc',
                        label: 'Manage your scrum workflow',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.date.calendar',
                path: `${CONCEPTS_PREFIX_PATH}/calendar`,
                title: 'Calendar',
                translateKey: 'nav.calendar',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                meta: {
                    description: {
                        translateKey: 'nav.calendarDesc',
                        label: 'Schedule and events',
                    },
                },
                subMenu: [],
            },
        ],
    },
]

export default dashboardsNavigationConfig
