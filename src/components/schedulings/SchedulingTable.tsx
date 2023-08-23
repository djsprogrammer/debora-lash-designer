import { useState } from 'react'
import SchedulingRow from './SchedulingRow'
import { Props, ServiceScheduling } from 'types/schedulings'
import { tableStyle } from 'commonStyles'
import DeleteSchedulingForm from 'components/schedulings/DeleteSchedulingForm'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT } from 'errorAdvices'
import { ButtonRef } from 'types/common'

const SchedulingTable = ({ schedulingsState }: Props) => {

    const [servicesScheduling, setServicesScheduling] = schedulingsState

    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [targetScheduling, setTargetScheduling] = useState<ServiceScheduling>({} as ServiceScheduling)
    const [possibleToCancel, setPossibleToCancel] = useState(true)

    const deleteScheduling = (buttonRef: ButtonRef) => {
        if (buttonRef.current) buttonRef.current.innerText = '...'
        setPossibleToCancel(false)
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetScheduling)
        }
        fetch(`${SERVER_URL}/delete-scheduling`, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingSchedulings = servicesScheduling.filter(scheduling => {
                            return scheduling.frontId !== targetScheduling.frontId
                        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
                        setServicesScheduling(remainingSchedulings)
                        break
                    case 503:                        
                        setTimeout(() => {
                            alert(DB_ERROR_TEXT)
                        }, 100)
                        break
                }
                setDeleteSchedulingForm(false)
                setPossibleToCancel(true)
            })
    }

    return (
        <div className='table-container mb-4'>
            <table className={tableStyle}>
                <thead className='table-dark'>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {servicesScheduling.map(scheduling => {
                        return (
                            <SchedulingRow 
                                key={scheduling.frontId}
                                scheduling={scheduling}
                                setDeleteSchedulingForm={setDeleteSchedulingForm}
                                setTargetScheduling={setTargetScheduling}
                            />
                        )
                    })}
                </tbody>
            </table>
            {
                deleteSchedulingForm
                ? <DeleteSchedulingForm 
                        setDeleteSchedulingForm={setDeleteSchedulingForm} 
                        deleteScheduling={deleteScheduling}
                        possibleToCancel={possibleToCancel}
                    />
                : null
            }
        </div>
    )

}

export default SchedulingTable