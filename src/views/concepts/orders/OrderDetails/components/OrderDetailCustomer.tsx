import Card from '@/components/ui/Card'
import IconText from '@/components/shared/IconText'
import { TbMail, TbExternalLink, TbPhone } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import type { Project } from '@/views/concepts/projects/ProjectList/types'

type CustomerDetailProps = {
    customer: Project
}

const OrderDetailCustomer = ({ customer }: CustomerDetailProps) => {
    return (
        <Card>
            <h4 className="mb-4">Customer</h4>
            <Link
                className="group flex items-center justify-between"
                to="/concepts/customers/customer-details/11"
            >
                <div className="flex items-center gap-2">
                    <div>
                        <div className="font-bold heading-text">
                            {customer.name}
                        </div>
                        <span>
                            <span className="font-semibold">
                                {customer.picName}{' '}
                            </span>
                            previous orders
                        </span>
                    </div>
                </div>
                <TbExternalLink className="text-xl hidden group-hover:block" />
            </Link>
            <hr className="my-5" />
            <IconText
                className="mb-4"
                icon={<TbMail className="text-xl opacity-70" />}
            >
                <span>{customer.currentSystem}</span>
            </IconText>
            <IconText icon={<TbPhone className="text-xl opacity-70" />}>
                <span>{customer.companySize}</span>
            </IconText>
            <hr className="my-5" />
            <h6 className="mb-4 font-bold">Shipping Address</h6>
            <address className="not-italic">
                <div className="mb-1">{customer.budget}</div>
                <div className="mb-1">{customer.category}</div>
                <div className="mb-1">{customer.picName}</div>
                <div>{customer.picRole}</div>
            </address>
        </Card>
    )
}

export default OrderDetailCustomer
