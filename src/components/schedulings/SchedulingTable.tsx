import SchedulingRow from './SchedulingRow'
import { Props } from 'types/schedulings'
import { tableStyle } from 'commonStyles'

const SchedulingTable = ({ schedulingsState }: Props) => {

    const [servicesScheduling] = schedulingsState

    return (
        <div className='table-container mb-4'>
            <table className={tableStyle}>
                <thead className='table-dark'>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {servicesScheduling.map(scheduling => {
                        return (
                            <SchedulingRow 
                                key={scheduling.frontId} 
                                scheduling={scheduling} 
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default SchedulingTable