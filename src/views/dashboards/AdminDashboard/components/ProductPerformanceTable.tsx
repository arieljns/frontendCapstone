import type { ProductPerformance } from '../hooks/useManagerSummary'

type ProductPerformanceTableProps = {
    rows: ProductPerformance[]
    totalProductsSold: number
    weekLabel: string
}

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

const qtyFormatter = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
})

const ProductPerformanceTable = ({
    rows,
    totalProductsSold,
    weekLabel,
}: ProductPerformanceTableProps) => {
    if (!rows.length) {
        return (
            <div className="py-8 text-center text-sm text-gray-500">
                Product performance will populate once orders start coming in.
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        <th className="py-2 pr-4">Product</th>
                        <th className="py-2 pr-4 text-right">Qty Sold</th>
                        <th className="py-2 text-right">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={String(row.product_id)}
                            className="border-t border-gray-100 text-gray-700 dark:border-gray-700 dark:text-gray-200"
                        >
                            <td className="py-3 pr-4 font-medium">
                                {row.product_name}
                            </td>
                            <td className="py-3 pr-4 text-right">
                                {qtyFormatter.format(row.total_qty_sold)}
                            </td>
                            <td className="py-3 text-right font-semibold">
                                {currencyFormatter.format(row.total_revenue)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Week of {weekLabel} -{' '}
                {qtyFormatter.format(totalProductsSold)} units sold
            </p>
        </div>
    )
}

export default ProductPerformanceTable
