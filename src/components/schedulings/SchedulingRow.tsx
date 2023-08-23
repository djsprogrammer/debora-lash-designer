import { useRef, memo } from 'react'
import { parseISO, format } from 'date-fns'
import { ServiceScheduling, SetScheduling } from 'types/schedulings'

interface Props {
    scheduling: ServiceScheduling
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    setTargetScheduling: SetScheduling
    blockedActions: boolean
}

const SchedulingRow = ({ scheduling, setDeleteSchedulingForm, setTargetScheduling, blockedActions }: Props) => {

    const buttonRef = useRef<HTMLButtonElement>(null)

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(scheduling.service.value)).replace('R$', '')
    const date = format(parseISO(scheduling.date), 'dd/MM')

    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{scheduling.service.name} -{value}</td>
            <td>{date}</td>
            <td>
                <button ref={buttonRef} onClick={() => {
                    if (!blockedActions) {
                        setDeleteSchedulingForm(true)
                        setTargetScheduling(scheduling)
                    }
                }} className='btn btn-sm btn-outline-danger'>
                    Excluir
                </button>
            </td>
        </tr>
    )
}

export default memo(SchedulingRow)