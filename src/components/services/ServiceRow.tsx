import DeleteButton from 'components/pages/DeleteButton'
import { BooleanSet } from 'types/common'
import { Service, SetService } from 'types/services'

interface Props {
    service: Service
    setTargetService: SetService
    setDeleteServiceForm: BooleanSet
}

const ServiceRow = ({ service, setTargetService, setDeleteServiceForm }: Props) => {

    const name = service._id
    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value)).replace('R$', '')

    return (
        <tr key={name}>
            <td>{name}</td>
            <td>{value}</td>
            <td>
                <DeleteButton onClick={() => {
                    setTargetService(service)
                    setDeleteServiceForm(true)
                }} /> 
            </td>
        </tr>
    )

}

export default ServiceRow