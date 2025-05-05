import { useRef } from 'react'
import QuotationFooter from './components/QuotationFooter'
import QuotationHeader from './components/QuotationHeader'
import QuotationTerms from './components/QuotationTerms'
import Button from '@/components/ui/Button'

import { useReactToPrint } from 'react-to-print'

const Quotation = () => {
    const printRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'MyDocument',
    })

    return (
        <div>
            <Button onClick={() => window.print()}>Print</Button>
            <div className="" ref={printRef}>
                <QuotationHeader />
                <QuotationFooter />
                <QuotationTerms />
                <QuotationFooter />
            </div>
        </div>
    )
}

export default Quotation
