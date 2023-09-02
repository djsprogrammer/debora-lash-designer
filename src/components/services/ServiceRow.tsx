import { memo } from 'react'
import { Pencil } from 'lucide-react'
import DeleteButton from 'components/pages/DeleteButton'
import { moneyFormat } from 'formFunctions/common'
import { BooleanSet } from 'types/common'
import { Service } from 'types/services'

interface Props {
    service: Service
    setIdForDeletion: React.Dispatch<React.SetStateAction<string>>
    setServiceForEdition: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: BooleanSet
    setEditServiceForm: BooleanSet
}

const ServiceRow = ({ service, setIdForDeletion, setServiceForEdition, setDeleteServiceForm, setEditServiceForm }: Props) => {

    const name = service._id

    // Deixando no formato 0,00
    const lastServiceValue = service.value.length - 1
    const value = moneyFormat(service.value[lastServiceValue].value)
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
            <td>
                <Pencil size={20} className='me-2 button' onClick={() => {
                    setServiceForEdition(service)
                    setEditServiceForm(true)
                }} />
                <DeleteButton onClick={() => {
                    setIdForDeletion(service._id)
                    setDeleteServiceForm(true)
                }} /> 
            </td>
        </tr>
    )

}

export default memo(ServiceRow)