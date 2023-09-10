import { Pencil } from 'lucide-react'

import { moneyFormat } from 'formFunctions/common'

import { Service } from 'types/services'

import DeleteButton from 'components/pages/DeleteButton'

interface Props {
    service: Service
    setIdForDeletion: React.Dispatch<React.SetStateAction<string>>
    setServiceForEdition: React.Dispatch<React.SetStateAction<Service>>
    setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
    setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
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

export default ServiceRow