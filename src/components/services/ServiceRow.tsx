import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { moneyFormat } from 'formFunctions/common'
import { BooleanSet } from 'types/common'
import { Service } from 'types/services'

interface Props {
    service: Service
    setTargetId: React.Dispatch<React.SetStateAction<string>>
    setDeleteServiceForm: BooleanSet
}

const ServiceRow = ({ service, setTargetId, setDeleteServiceForm }: Props) => {

    const name = service._id

    // Deixando no formato 0,00
    const lastServiceValue = service.value.length - 1
    const value = moneyFormat(service.value[lastServiceValue].value)
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
            <td>
                <DeleteButton onClick={() => {
                    setTargetId(service._id)
                    setDeleteServiceForm(true)
                }} /> 
            </td>
        </tr>
    )

}

export default memo(ServiceRow)