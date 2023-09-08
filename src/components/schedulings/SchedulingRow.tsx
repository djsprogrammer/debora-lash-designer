import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { ServiceScheduling } from 'types/schedulings'
import { moneyFormat, dateFormat } from 'formFunctions/common'

interface Props {
    scheduling: ServiceScheduling
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

    const sum = scheduling.service.value.reduce((acc, current) => {
        return acc + current
    }, 0)

    // Deixando no formato 0,00
    const value = moneyFormat(sum)

    // Deixando no formato dd/mm
    const date = dateFormat(scheduling.date)
    
    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{name()}</td>
            <td>{value}</td>
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