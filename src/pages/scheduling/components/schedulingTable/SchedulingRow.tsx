import { parseISO, format } from 'date-fns'
import { ServiceScheduling } from '../../../../types/services'

interface Props {
    scheduling: ServiceScheduling
    getScheduling: (scheduling: ServiceScheduling) => void
}

const Index = ({ scheduling, getScheduling }: Props) => {

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(scheduling.service.value)).replace('R$', '')
    const date = format(parseISO(scheduling.date), 'dd/MM')

    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{scheduling.service.name} -{value}</td>
            <td>{date}</td>
            <td><button onClick={() => getScheduling(scheduling)}>Confirmar</button></td>
        </tr>
    )
}

export default Index