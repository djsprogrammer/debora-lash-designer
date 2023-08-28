import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { moneyFormat } from 'formFunctions/common'
import { BooleanSet } from 'types/common'
import { Service, SetService } from 'types/services'

interface Props {
    service: Service
    setTargetService: SetService
    setDeleteServiceForm: BooleanSet
}

const ServiceRow = ({ service, setTargetService, setDeleteServiceForm }: Props) => {

    const name = service._id

    // Deixando no formato 0,00
    const value = moneyFormat(service.value)

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

export default memo(ServiceRow)