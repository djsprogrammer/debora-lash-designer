import SchedulingRow from './SchedulingRow'
import { ServiceScheduling } from '../../../../types/services'
import { tableStyle } from '../../../../commonStyles'

interface Props {
    servicesScheduling: ServiceScheduling[]
    setServicesScheduling: React.Dispatch<React.SetStateAction<ServiceScheduling[]>>
}

const Index = ({ servicesScheduling, setServicesScheduling }: Props) => {

    const getScheduling = (scheduling: ServiceScheduling) => {

        // Invertendo o estado do agendamento alvo ao clicar no botão
        let targetScheduling: ServiceScheduling = servicesScheduling.filter(current => current.client === scheduling.client)[0]
        targetScheduling.confirmed = !targetScheduling.confirmed

        // Agendamentos não selecionados
        const otherSchedulings = servicesScheduling.filter(current => current.client !== scheduling.client)

        // Organizando novos agendamentos por datas
        const newSchedulings = [...otherSchedulings, targetScheduling]
            .sort((a, b) => a.date.localeCompare(b.date))

        setServicesScheduling(newSchedulings)

    }

    return (
        <div className='w-100'>
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
                        {servicesScheduling.map(scheduling => <SchedulingRow scheduling={scheduling} getScheduling={getScheduling} />)}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default Index