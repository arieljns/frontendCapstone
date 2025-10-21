import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import IconText from '@/components/shared/IconText'
import { TbPaperclip, TbMessageCircle, TbMoneybag } from 'react-icons/tb'
import { useScrumBoardStore } from '../store/scrumBoardStore'
import { taskLabelColors } from '../utils'
import type { Ticket } from '../types'
import type { CardProps } from '@/components/ui/Card'
import type { Ref } from 'react'
import { labelList } from '../utils'

interface BoardCardProps extends CardProps {
    data: Ticket
    ref?: Ref<HTMLDivElement>
}

const BoardCard = (props: BoardCardProps) => {
    const { openDialog, updateDialogView, setSelectedTicketId } =
        useScrumBoardStore()

    const { data, ref, ...rest } = props

    const {
        ticket_id,
        ticket_labels,
        ticket_comments,
        ticket_attachments,
        ticket_dealValue,
        bm_name,
        bm_companySize,
        am_activationAgreement,
        am_expiredDate,
        am_sentiment,
    } = data

    const onCardClick = () => {
        openDialog()
        updateDialogView('TICKET')
        setSelectedTicketId(id)
    }

    return (
        <Card
            ref={ref}
            clickable
            className="hover:shadow-lg rounded-lg mb-4 relative border-0"
            bodyClass="p-4"
            onClick={() => onCardClick()}
            {...rest}
        >
            <div
                className={`
      absolute left-0 top-0 h-full w-2 rounded-l-lg
      ${
          am_sentiment === 'negative'
              ? 'bg-red-500'
              : am_sentiment === 'positive'
                ? 'bg-green-500'
                : am_sentiment === 'neutral'
                  ? 'bg-yellow-400'
                  : 'bg-gray-300'
      }
    `}
            />
            <div className="mb-2 font-bold heading-text text-base">
                {bm_name}
            </div>
            {ticket_labels.length > 0 ? (
                <>
                    {ticket_labels.map((label, index) => (
                        <Tag
                            key={label + index}
                            className={`mr-2 rtl:ml-2 mb-2 ${taskLabelColors[label]}`}
                        >
                            {label}
                        </Tag>
                    ))}
                </>
            ) : (
                <Tag
                    className={`mr-2 rtl:ml-2 mb-2 ${taskLabelColors['Cold']}`}
                >
                    Cold
                </Tag>
            )}
            <div className="flex items-center justify-between">
                {/* <UsersAvatarGroup avatarProps={{ size: 25 }} users={members} /> */}
                <div className="flex justify-center items-center gap-4">
                    <div className="font-semibold">
                        {' '}
                        {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            maximumFractionDigits: 0,
                        }).format(ticket_dealValue)}
                    </div>
                    <IconText
                        className="font-semibold gap-1"
                        icon={<TbMessageCircle className="text-base" />}
                    >
                        {ticket_comments.length}
                    </IconText>

                    <IconText
                        icon={<TbPaperclip />}
                        className="text-base gap-1"
                    >
                        {ticket_attachments.length}
                    </IconText>
                </div>
            </div>
            <hr></hr>
            <div className="font-semibold">
                Follow Up: {new Date(am_expiredDate).toLocaleDateString('en-GB')}
            </div>
        </Card>
    )
}

export default BoardCard
