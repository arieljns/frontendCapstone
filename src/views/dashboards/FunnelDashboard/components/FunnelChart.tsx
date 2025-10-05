import Chart from 'react-apexcharts'

const FunnelChart = () => {
    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            toolbar: { show: false },
            dropShadow: {
                enabled: true,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '70%',
                columnWidth: '100%',
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (_, { seriesIndex, dataPointIndex, w }) => {
                // Show percentages on dropoff blocks
                if (seriesIndex === 1) {
                    const total =
                        w.globals.series[0][dataPointIndex] +
                        w.globals.series[1][dataPointIndex]
                    const value = w.globals.series[1][dataPointIndex]
                    return `${((value / total) * 100).toFixed(1)}%`
                }
                return ''
            },
            offsetX: -10,
            style: { fontSize: '14px' },
        },
        xaxis: {
            categories: [
                'Quotation Sent',
                'Follow Up',
                'Negotiation',
                'Decision Pending',
                'Closed Won',
                'Closed Lost',
            ],
        },
        legend: { show: false },
        grid: { show: false },
    }

    const series = [
        {
            name: 'Total',
            data: [264, 240, 195, 164, 68, 120],
        },
        {
            name: 'Convertion',
            data: [69,40, 31, 20, 59, 12],
        },
    ]

    return <Chart options={options} series={series} type="bar" height={450} />
}

export default FunnelChart
