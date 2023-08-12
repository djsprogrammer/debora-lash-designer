import { parseISO, format } from 'date-fns'
import { ServiceScheduling } from '../../../types/services'
import { tableStyle } from '../../../commonStyles'

interface Props {
    servicesScheduling: ServiceScheduling[]
}

const Index = ({ servicesScheduling }: Props) => {

    return (
        <div className='table-container'>
            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {servicesScheduling.map(scheduling => {

                        const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(scheduling.service.value)).replace('R$', '')
                        const date = format(parseISO(scheduling.date), 'dd/MM')

                        return (
                            <tr>
                                <td>{scheduling.client}</td>
                                <td>{scheduling.service.name} -{value}</td>
                                <td>{date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default Index