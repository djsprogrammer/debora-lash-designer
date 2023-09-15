import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'

const ServicesChart = ({ services }) => {

    const data = {
        labels: services.map(service => service[0]),
        datasets: [{
            label: 'Serviços oferecidos',
            data: services.map(service => service[1])
        }]
    }

    return (
        <div id='chart' className='mt-5'>
            <Pie data={data} />
        </div>
    )

}

export default ServicesChart