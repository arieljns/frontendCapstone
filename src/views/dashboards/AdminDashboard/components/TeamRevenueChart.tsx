import ReactApexChart from 'react-apexcharts'

const options: ApexCharts.ApexOptions = {
    chart: {
        type: 'area',
        toolbar: { show: false },
    },
    stroke: {
        curve: 'stepline',
        width: 2,
    },
    xaxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
    },
    yaxis: {
        labels: {
            formatter: (value) => `Rp ${value.toLocaleString()}`,
        },
    },
    dataLabels: { enabled: false },
    tooltip: {
        y: {
            formatter: (value) => `Rp ${value.toLocaleString()}`,
        },
    },
    fill: {
        opacity: 0.3, // Light transparent shading
    },
}

const series = [
    {
        name: 'Revenue',
        data: [
            12000000, 15000000, 18000000, 14000000, 20000000, 25000000,
            23000000, 24000000, 26000000, 28000000, 30000000, 32000000,
        ],
    },
    {
        name: 'Target',
        data: [
            18000000, 13000000, 19000000, 9000000, 18000000, 22000000,
            18000000, 19000000, 24000000, 27000000, 24000000, 30000000,
        ],
    },
]

export default function TeamRevenueChart() {
    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={350}
            />
        </div>
    )
}
