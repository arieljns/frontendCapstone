import QuotationHeader from './components/QuotationHeader'
import QuotationTerms from './components/QuotationTerms'
import Button from '@/components/ui/Button'
import './components/quotationHeader.css'
import { apiGetQuotationData } from '@/services/ProductService'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import type { QuotationData } from './components/QuotationHeader'

const Quotation = () => {
    const { id } = useParams()

    const shouldFetch = Boolean(id)
    const {
        data,
        error,
        isLoading,
    } = useSWR<QuotationData>(
        shouldFetch ? `quotation-${id}` : null,
        () => apiGetQuotationData<QuotationData>(id as string),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    if (!id) {
        return (
            <div className="p-6">
                <p className="text-red-500">
                    Quotation ID is missing from the route.
                </p>
            </div>
        )
    }

    return (
        <div className="print-page">
            <Button className="exclude" onClick={() => window.print()}>
                Print
            </Button>
            {error ? (
                <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    Failed to load quotation data. Please refresh the page or
                    try again later.
                </div>
            ) : (
                <div>
                    <QuotationHeader
                        data={data}
                        isLoading={isLoading}
                        quotationId={id}
                    />
                    <QuotationTerms />
                </div>
            )}
        </div>
    )
}

export default Quotation
