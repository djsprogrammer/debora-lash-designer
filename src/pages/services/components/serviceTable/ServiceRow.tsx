import { useRef } from 'react'
import { Service } from '../../../../types/services'

interface Props {
    service: Service
    deleteService: (targetService: Service, button: React.RefObject<HTMLButtonElement>) => void
    setEditValuesInTheForm: (tdName: string, value: number) => void
}

const Index = ({ service, deleteService, setEditValuesInTheForm }: Props) => {

    const deleteButton = useRef<HTMLButtonElement>(null)

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value))

    const buttonStyle = 'btn btn-sm rounded-pill'

    return (
        <tr key={service.name}>
            <td>{service.name}</td>
            <td>{value}</td>
            <td>
                <button onClick={() => setEditValuesInTheForm(service.name, service.value)} className={`${buttonStyle} btn-outline-dark me-2`}>Editar</button>
                <button ref={deleteButton} onClick={() => deleteService(service, deleteButton)} className={`${buttonStyle} btn-dark`}>Excluir</button>
            </td>
        </tr>
    )

}

export default Index