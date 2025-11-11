const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

export const formatCurrency = (value?: number | null) => {
    if (value === undefined || value === null) {
        return '--'
    }
    return currencyFormatter.format(value)
}

export const formatPercent = (value?: number | null, fractionDigits = 1) => {
    if (value === undefined || value === null) {
        return '--'
    }
    return `${(value * 100).toFixed(fractionDigits)}%`
}

export const sentimentPalette = {
    positive: '#16a34a',
    neutral: '#facc15',
    negative: '#f22929',
}
