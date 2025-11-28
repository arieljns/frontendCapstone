import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'
import type { WeeklySummaryView } from '../hooks/useManagerSummary'

type ConversionRateChartProps = {
    weeks: WeeklySummaryView[]
}

const formatPercentage = (value: number | string) => {
    const numericValue =
        typeof value === 'number' ? value : Number.parseFloat(value)
    if (Number.isNaN(numericValue)) {
        return '0%'
    }
    return `${numericValue.toFixed(1)}%`
}

const ConversionRateChart = ({ weeks }: ConversionRateChartProps) => {
    const categories = useMemo(
        () => weeks.map((week) => week.label),
        [weeks],
    )
    const data = useMemo(
        () => weeks.map((week) => week.conversionRate),
        [weeks],
    )
    const yAxisMax = useMemo(() => {
        if (!data.length) {
            return 100
        }
        const highest = Math.max(...data)
        const rounded = Math.ceil(highest / 10) * 10
        return Math.max(rounded, 100)
    }, [data])

    const options = useMemo<ApexOptions>(
        () => ({
            chart: {
                type: 'line',
                toolbar: { show: false },
            },
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            xaxis: {
                categories,
            },
            yaxis: {
                max: yAxisMax,
                min: 0,
                labels: {
                    formatter: (value) => formatPercentage(value),
                },
            },
            markers: {
                size: 4,
            },
            tooltip: {
                y: {
                    formatter: (value) => formatPercentage(value),
                },
            },
            dataLabels: { enabled: false },
            colors: ['#2563EB'],
            fill: {
                type: 'gradient',
                gradient: {
                    opacityFrom: 0.5,
                    opacityTo: 0.1,
                    stops: [0, 100],
                },
            },
            noData: {
                text: 'Conversion rate data is not available yet.',
            },
        }),
        [categories, yAxisMax],
    )

    if (!weeks.length) {
        return (
            <div className="py-8 text-center text-sm text-gray-500">
                Conversion rate data will show up after a reporting cycle.
            </div>
        )
    }

    return (
        <ReactApexChart
            options={options}
            series={[
                {
                    name: 'Conversion Rate',
                    data,
                },
            ]}
            type="line"
            height={350}
        />
    )
}

export default ConversionRateChart
