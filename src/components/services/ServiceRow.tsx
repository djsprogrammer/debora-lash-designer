import { Trash } from 'lucide-react'
import { BooleanSet } from 'types/common'
import { Service, SetService } from 'types/services'

interface Props {
    service: Service
    setTargetService: SetService
    setDeleteServiceForm: BooleanSet
}

const ServiceRow = ({ service, setTargetService, setDeleteServiceForm }: Props) => {

    const name = service.name
    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value)).replace('R$', '')

    return (
        <tr key={name}>
            <td>{name}</td>
            <td>{value}</td>
            <td>
                <Trash size={20} className='button' onClick={() => {
                    setTargetService(service)
                    setDeleteServiceForm(true)
                }} />
            </td>
        </tr>
    )

}

export default ServiceRow