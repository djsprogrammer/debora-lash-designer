import { useRef, useState, useEffect, memo } from 'react'
import { parseISO, format } from 'date-fns'
import { ServiceScheduling } from '../../../../types/services'

interface Props {
    scheduling: ServiceScheduling
    getScheduling: (scheduling: ServiceScheduling) => void
}

const SchedulingRow = ({ scheduling, getScheduling }: Props) => {

    const confirmButton = useRef<HTMLButtonElement>(null)

    const [confirmed, setConfirmed] = useState(scheduling.confirmed)

    useEffect(() => {

        if (confirmButton.current) {

            const button = confirmButton.current

            if (confirmed) {

                // Mudando o estilo do botão para indicar que foi confirmado
                button.classList.add('btn-success')
                button.classList.remove('btn-outline-success')

                button.innerText = 'Desconfirmar'

            } else {

                // Mudando o estilo do botão para indicar que foi confirmado
                button.classList.add('btn-outline-success')
                button.classList.remove('btn-success')

                button.innerText = 'Confirmar'                

            }

        }

    }, [confirmed])

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(scheduling.service.value)).replace('R$', '')
    const date = format(parseISO(scheduling.date), 'dd/MM')

    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{scheduling.service.name} -{value}</td>
            <td>{date}</td>
            <td><button ref={confirmButton} className='btn btn-sm btn-outline-success' onClick={() => {
                getScheduling(scheduling)
                setConfirmed(!confirmed)
            }}>Confirmar</button></td>
        </tr>
    )
}

export default memo(SchedulingRow)