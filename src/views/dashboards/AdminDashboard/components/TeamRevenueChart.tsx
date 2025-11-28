import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ApexAxisChartSeries, ApexOptions } from 'apexcharts'
import type { WeeklySummaryView } from '../hooks/useManagerSummary'

type TeamRevenueChartProps = {
    weeks: WeeklySummaryView[]
}

const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

const formatCurrency = (value: number | string) => {
    const numericValue =
        typeof value === 'number' ? value : Number.parseFloat(value)
    if (Number.isNaN(numericValue)) {
        return currencyFormatter.format(0)
    }
    return currencyFormatter.format(numericValue)
}

const TeamRevenueChart = ({ weeks }: TeamRevenueChartProps) => {
    const categories = useMemo(() => weeks.map((week) => week.label), [weeks])

    const series = useMemo<ApexAxisChartSeries>(
        () => [
            {
                name: 'Revenue Won',
                data: weeks.map((week) => week.totalRevenueWon),
            },
            {
                name: 'Revenue Lost',
                data: weeks.map((week) => week.totalRevenueLost),
            },
        ],
        [weeks],
    )

    const options = useMemo<ApexOptions>(
        () => ({
            chart: {
                type: 'area',
                stacked: true,
                toolbar: { show: false },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                categories,
            },
            yaxis: {
                labels: {
                    formatter: (value) => formatCurrency(value),
                },
            },
            dataLabels: { enabled: true },
            tooltip: {
                y: {
                    formatter: (value) => formatCurrency(value),
                },
            },
            fill: {
                opacity: 0.3,
            },
            colors: ['#15803D', '#B91C1C'],
            legend: {
                position: 'top',
                horizontalAlign: 'left',
            },
            noData: {
                text: 'No revenue data yet.',
            },
        }),
        [categories],
    )

    if (!weeks.length) {
        return (
            <div className="py-8 text-center text-sm text-gray-500">
                Revenue data will appear once deals start closing.
            </div>
        )
    }

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
        />
    )
}

export default TeamRevenueChart
