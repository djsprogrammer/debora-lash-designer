import SchedulingRow from './SchedulingRow'
import { ServiceScheduling } from 'types/schedulings'
import { Props } from 'types/schedulings'
import { tableStyle } from 'commonStyles'

const SchedulingTable = ({ schedulingsState }: Props) => {

    const [servicesScheduling, setServicesScheduling] = schedulingsState

    const getScheduling = (scheduling: ServiceScheduling) => {

        // Invertendo o estado de confirmação do agendamento alvo ao clicar no botão
        let targetScheduling: ServiceScheduling = servicesScheduling.filter(current => current.frontId === scheduling.frontId)[0]
        targetScheduling.confirmed = !targetScheduling.confirmed

        // Agendamentos não selecionados
        const otherSchedulings = servicesScheduling.filter(current => current.frontId !== scheduling.frontId)

        // Organizando novos agendamentos por datas
        const newSchedulings = [...otherSchedulings, targetScheduling]
            .sort((a, b) => a.date.localeCompare(b.date)).reverse()

        setServicesScheduling(newSchedulings)

    }

    return (
        <div className='table-container mb-4'>
            <table className={tableStyle}>
                <thead className='table-dark'>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {servicesScheduling.map(scheduling => {
                        return (
                            <SchedulingRow 
                                key={scheduling.frontId} 
                                scheduling={scheduling} 
                                getScheduling={getScheduling} 
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default SchedulingTable