import SchedulingRow from './SchedulingRow'
import { ServiceScheduling } from '../../../../types/services'
import { tableStyle } from '../../../../commonStyles'

interface Props {
    servicesScheduling: ServiceScheduling[]
}

const Index = ({ servicesScheduling }: Props) => {

    return (
        <div className='table-container'>
            <table className={tableStyle}>
                <thead className='table-dark'>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {servicesScheduling.map(scheduling => <SchedulingRow scheduling={scheduling} />)}
                </tbody>
            </table>
        </div>
    )

}

export default Index