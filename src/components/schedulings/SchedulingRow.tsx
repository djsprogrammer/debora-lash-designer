import { memo } from 'react'
import { Trash } from 'lucide-react'
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
                <Trash size={20} className='button' onClick={() => {
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