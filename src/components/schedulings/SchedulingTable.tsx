import { useState } from 'react'
import SchedulingRow from './SchedulingRow'
import { Props, ServiceScheduling } from 'types/schedulings'
import { tableStyle } from 'commonStyles'
import DeleteSchedulingForm from 'components/schedulings/DeleteSchedulingForm'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT } from 'errorAdvices'

const SchedulingTable = ({ schedulingsState }: Props) => {

    const [servicesScheduling, setServicesScheduling] = schedulingsState

    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [targetScheduling, setTargetScheduling] = useState<ServiceScheduling>({} as ServiceScheduling)

    const deleteScheduling = (button: React.RefObject<HTMLButtonElement>) => {
        if (button.current) button.current.innerText = '...'
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
                        setDeleteSchedulingForm(false)
                        break
                    case 503:
                        setDeleteSchedulingForm(false)
                        setTimeout(() => {
                            alert(DB_ERROR_TEXT)
                        }, 100)
                        break
                }
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
                    />
                : null
            }
        </div>
    )

}

export default SchedulingTable