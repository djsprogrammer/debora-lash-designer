import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

interface FinancialChartProps {
    metrics: number[]
}

const FinancialChart = ({ metrics }: FinancialChartProps) => {

    const data = {
        labels: ['Receita', 'Despesa', 'Lucro'],
        datasets: [{
            label: 'Gráfico Financeiro',
            data: [metrics[0], metrics[1], metrics[2]],
            backgroundColor: ['green', 'red', 'blue'],
            animation: {
                duration: 0
            }
        }]
    }

    return (
        <div className='w-50 m-auto my-3'>
            <Bar data={data}  />
        </div>
    )

}

export default FinancialChart