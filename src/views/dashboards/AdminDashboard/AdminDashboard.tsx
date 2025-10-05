import { Card } from '@/components/ui'
import ReactApexChart from 'react-apexcharts'
import TeamRevenueChart from './components/TeamRevenueChart'

const options: ApexCharts.ApexOptions = {
    chart: {
        type: 'bar',
        stacked: true,
        stackType: '100%',
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '60%',
        },
    },
    colors: [
        '#005F73', // Essentials
        '#0A9396', // Plus
        '#94D2BD', // Talenta360
        '#E9D8A6', // Performance Management
        '#EE9B00', // Talent Management
        '#CA6702', // Smart Notification
    ],
    xaxis: {
        labels: {
            formatter: (val) => `${val}%`,
        },
    },
    yaxis: {
        categories: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
    },
    tooltip: {
        y: {
            formatter: (val) => `${val}%`,
        },
    },
}

const series = [
    {
        name: 'Essentials',
        data: [30, 25, 28, 35, 20, 18, 22, 25, 27, 30, 28, 24],
    },
    { name: 'Plus', data: [25, 30, 22, 20, 28, 25, 27, 30, 29, 31, 30, 28] },
    { name: 'Talenta360', data: [15, 10, 12, 10, 15, 12, 10, 9, 8, 7, 6, 8] },
    {
        name: 'Performance Management',
        data: [10, 12, 15, 13, 17, 14, 15, 12, 10, 8, 10, 12],
    },
    {
        name: 'Talent Management',
        data: [12, 15, 18, 17, 12, 15, 18, 16, 14, 12, 15, 17],
    },
    {
        name: 'Smart Notification',
        data: [8, 8, 5, 5, 8, 16, 8, 8, 12, 12, 11, 11],
    },
]

export default function AdminDashboard() {
    return (
        <div>
            <Card>
                <h4 className="font-semibold">Total Revenue vs Target</h4>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Neque, ab.
                </p>
                <TeamRevenueChart />
            </Card>

            <div className="mt-4">
                <Card>
                    <h4 className="font-semibold">Total Product Sold</h4>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="bar"
                        height={500}
                    />
                </Card>
            </div>
        </div>
    )
}
