import ReactApexChart from 'react-apexcharts'
const options: ApexCharts.ApexOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            horizontal: false, // ✅ Vertical bar
            borderRadius: 4,
        },
    },
    colors: ['#2ecc71', '#e74c3c', '#f1c40f'],
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
    yaxis: {
        title: { text: 'Total Leads' },
    },
    legend: {
        position: 'top',
    },
    dataLabels: {
        enabled: false,
    },
}

const series = [
    {
        name: 'Positive',
        data: [10, 15, 8, 5, 12, 2],
    },
    {
        name: 'Negative',
        data: [3, 5, 6, 4, 1, 7],
    },
    {
        name: 'Mix',
        data: [2, 3, 4, 2, 3, 1],
    },
]

export default function SentimentChart() {
    return (
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    )
}
