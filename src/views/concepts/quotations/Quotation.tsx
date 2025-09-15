import QuotationHeader from './components/QuotationHeader'
import QuotationTerms from './components/QuotationTerms'
import Button from '@/components/ui/Button'
import './components/quotationHeader.css'

const Quotation = () => {
    return (
        <div className="print-page">
            <Button className="exclude" onClick={() => window.print()}>Print</Button>
            <div className="">
                <QuotationHeader />
                <QuotationTerms />
            </div>
        </div>
    )
}

export default Quotation
