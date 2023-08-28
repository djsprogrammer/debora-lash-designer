import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { ServiceScheduling, SetScheduling } from 'types/schedulings'
import { valueAndDateFormat } from 'formFunctions/common'

interface Props {
    scheduling: ServiceScheduling
    setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
    setTargetScheduling: SetScheduling
}

const SchedulingRow = ({ scheduling, setDeleteSchedulingForm, setTargetScheduling }: Props) => {

    const [value, date] = valueAndDateFormat(scheduling.service.value, scheduling.date)
    
    return (
        <tr>
            <td>{scheduling.client}</td>
            <td>{scheduling.service._id} -{value}</td>
            <td>{date}</td>
            <td>
                <DeleteButton onClick={() => {
                    setDeleteSchedulingForm(true)
                    setTargetScheduling(scheduling)
                }} />
            </td>
        </tr>
    )
}

export default memo(SchedulingRow)