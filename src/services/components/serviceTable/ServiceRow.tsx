import { useRef } from 'react'
import { Service } from '../../../types/services'
import { TdRef } from './Index'

interface Props {
    service: Service
    deleteService: (targetService: Service) => void
    setEditValuesInTheForm: (tdName: TdRef, value: TdRef) => void
}

const Index = ({ service, deleteService, setEditValuesInTheForm }: Props) => {

    const tdName = useRef<HTMLTableDataCellElement>(null)
    const tdValue = useRef<HTMLTableDataCellElement>(null)

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value))

    const commonStyle = 'btn btn-sm rounded-pill'

    return (
        <tr key={service.name}>
            <td ref={tdName}>{service.name}</td>
            <td className='d-none' ref={tdValue}>{service.value}</td>
            <td>{value}</td>
            <td>
                <button onClick={() => setEditValuesInTheForm(tdName, tdValue)} className={`${commonStyle} btn-outline-dark me-2`}>Editar</button>
                <button onClick={() => deleteService(service)} className={`${commonStyle} btn-dark`}>Excluir</button>
            </td>
        </tr>
    )

}

export default Index