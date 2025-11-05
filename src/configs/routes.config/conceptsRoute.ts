import { lazy } from 'react'
import {
    CONCEPTS_PREFIX_PATH,
    DASHBOARDS_PREFIX_PATH,
} from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const conceptsRoute: Routes = [
    {
        key: 'concepts.ai.chat',
        path: `${CONCEPTS_PREFIX_PATH}/ai/chat`,
        component: lazy(() => import('@/views/concepts/ai/Chat')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.quotation',
        path: `${CONCEPTS_PREFIX_PATH}/quotation/:id`,
        component: lazy(() => import('@/views/concepts/quotations/Quotation')),
        authority: [USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.customers.customerList',
        path: `${CONCEPTS_PREFIX_PATH}/members`,
        component: lazy(
            () => import('@/views/concepts/customers/CustomerList'),
        ),
        authority: [ADMIN],
    },

    {
        key: 'concepts.meetingDebriefEdit',
        path: `${CONCEPTS_PREFIX_PATH}/meeting-debrief-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/meetingDebriefEdit/OrderForm'),
        ),
        authority: [USER],
    },
    {
        key: 'concepts.customers.customerEdit',
        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/customers/CustomerEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit customer',
                description:
                    'Manage customer details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.customers.customerCreate',
        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-create`,
        component: lazy(
            () => import('@/views/concepts/customers/CustomerCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create customer',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.customers.customerDetails',
        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-details/:id`,
        component: lazy(
            () => import('@/views/concepts/customers/CustomerDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.products.productList',
        path: `${CONCEPTS_PREFIX_PATH}/products/product-list`,
        component: lazy(() => import('@/views/concepts/products/ProductList')),
        authority: [ADMIN],
    },
    {
        key: 'concepts.products.productEdit',
        path: `${CONCEPTS_PREFIX_PATH}/products/product-edit/:id`,
        component: lazy(() => import('@/views/concepts/products/ProductEdit')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit product',
                description:
                    'Quickly manage product details, stock, and availability.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.products.productCreate',
        path: `${CONCEPTS_PREFIX_PATH}/products/product-create`,
        component: lazy(
            () => import('@/views/concepts/products/ProductCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create product',
                description:
                    'Quickly add products to your inventory. Enter key details, manage stock, and set availability.',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.projects.projectList',
        path: `${CONCEPTS_PREFIX_PATH}/projects/project-list`,
        component: lazy(() => import('@/views/concepts/projects/ProjectList')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.projects.projectList',
        path: `${CONCEPTS_PREFIX_PATH}/member/members-create`,
        component: lazy(
            () =>
                import('@/views/concepts/members/MembersCreate/MembersCreate'),
        ),
        authority: [ADMIN],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.members',
        path: `${CONCEPTS_PREFIX_PATH}/members/details/:id`,
        component: lazy(
            () => import('@/views/concepts/members/MembersDetails'),
        ),
        authority: [ADMIN],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.projects.projectDetails',
        path: `${CONCEPTS_PREFIX_PATH}/projects/project-details/:id`,
        component: lazy(
            () => import('@/views/concepts/projects/ProjectDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.projects.projectTasks',
        path: `${CONCEPTS_PREFIX_PATH}/projects/tasks`,
        component: lazy(() => import('@/views/concepts/projects/Tasks')),
        authority: [USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.projects.projectIssue',
        path: `${CONCEPTS_PREFIX_PATH}/projects/tasks/:id`,
        component: lazy(() => import('@/views/concepts/projects/Issue')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.orders.orderList',
        path: `${CONCEPTS_PREFIX_PATH}/orders/order-list`,
        component: lazy(() => import('@/views/concepts/orders/OrderList')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.orders.orderEdit',
        path: `${CONCEPTS_PREFIX_PATH}/orders/order-edit/:id`,
        component: lazy(() => import('@/views/concepts/orders/OrderEdit')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit order',
                contained: true,
                description: 'Manage and track orders efficiently',
            },
            footer: false,
        },
    },
    {
        key: 'concepts.orders.orderCreate',
        path: `${CONCEPTS_PREFIX_PATH}/orders/order-create/:id`,
        component: lazy(() => import('@/views/concepts/orders/OrderCreate')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create order',
                contained: true,
                description:
                    'Create new customer orders quickly and accurately',
            },
            footer: false,
        },
    },
    {
        key: 'concepts.orders.orderDetails',
        path: `${CONCEPTS_PREFIX_PATH}/orders/order-details/:id`,
        component: lazy(() => import('@/views/concepts/orders/OrderDetails')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                contained: true,
                title: lazy(
                    () =>
                        import(
                            '@/views/concepts/orders/OrderDetails/components/OrderDetailHeader'
                        ),
                ),
                extraHeader: lazy(
                    () =>
                        import(
                            '@/views/concepts/orders/OrderDetails/components/OrderDetailHeaderExtra'
                        ),
                ),
            },
            pageContainerType: 'contained',
        },
    },
    {
        key: 'concepts.calendar',
        path: `${CONCEPTS_PREFIX_PATH}/calendar`,
        component: lazy(() => import('@/views/concepts/calendar/Calendar')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.fileManager',
        path: `${CONCEPTS_PREFIX_PATH}/file-manager`,
        component: lazy(() => import('@/views/concepts/files/FileManager')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.chat',
        path: `${CONCEPTS_PREFIX_PATH}/chat`,
        component: lazy(() => import('@/views/concepts/chat/Chat')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
]

export default conceptsRoute
