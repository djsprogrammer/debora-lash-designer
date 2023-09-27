import { memo } from 'react'

import { sumOfServices } from 'formFunctions/scheduling/common'
import { moneyFormat, dateFormat } from 'formFunctions/common'

import { Scheduling } from 'types/schedulings'

import DeleteButton from 'components/pages/DeleteButton'

interface Props {
    scheduling: Scheduling
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    setTargetId: React.Dispatch<React.SetStateAction<string>>
}

const SchedulingRow = ({ scheduling, setDeleteSchedulingForm, setTargetId }: Props) => {

    const name = () => {
        const names = scheduling.service.name
        if (names.length > 1) {
            return `${names[0]} & ${names[1]}`
        }
        return names[0]
    }

    // Deixando no formato 0,00
    const value = sumOfServices(scheduling.service.value)

    // Deixando no formato dd/mm
    const date = dateFormat(scheduling.date)
    
    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{name()}</td>
            <td>{moneyFormat(value)}</td>
            <td>{date}</td>
            <td>
                <DeleteButton onClick={() => {
                    setDeleteSchedulingForm(true)
                    setTargetId(scheduling._id)
                }} />
            </td>
        </tr>
    )
}

export default memo(SchedulingRow)