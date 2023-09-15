import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

interface ServicesChartProps {
    services: [string, number][]
}

const ServicesChart = ({ services }: ServicesChartProps) => {

    const data = {
        labels: services.map(service => service[0]),
        datasets: [{
            label: 'Serviços oferecidos',
            data: services.map(service => service[1])
        }]
    }

    return (
        <div id='chart' className='m-auto my-5'>
            <Pie data={data} />
        </div>
    )

}

export default ServicesChart