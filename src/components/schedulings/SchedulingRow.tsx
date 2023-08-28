import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { ServiceScheduling, SetScheduling } from 'types/schedulings'
import { valueAndDateFormat } from 'formFunctions/common'

interface Props {
    scheduling: ServiceScheduling
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    setTargetScheduling: SetScheduling
    blockedActions: boolean
}

const SchedulingRow = ({ scheduling, setDeleteSchedulingForm, setTargetScheduling, blockedActions }: Props) => {

    const [value, date] = valueAndDateFormat(scheduling.service.value, scheduling.date)
    
    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{scheduling.service.name} -{value}</td>
            <td>{date}</td>
            <td>
                <DeleteButton onClick={() => {
                    if (!blockedActions) {
                        setDeleteSchedulingForm(true)
                        setTargetScheduling(scheduling)
                    }
                }} />
            </td>
        </tr>
    )
}

export default memo(SchedulingRow)