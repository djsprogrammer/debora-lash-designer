import { useState } from 'react'
import SchedulingRow from './SchedulingRow'
import { Props, ServiceScheduling } from 'types/schedulings'
import { tableStyle } from 'commonStyles'
import DeleteForm from 'components/pages/DeleteForm'
import { DELETE_SCHEDULING } from 'constants/urls'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT } from 'errorAdvices'
import { BACKEND_SCHEDULINGS } from 'pages/Scheduling'

const SchedulingTable = ({ schedulingsState }: Props) => {

    const [servicesScheduling, setServicesScheduling] = schedulingsState

    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [targetScheduling, setTargetScheduling] = useState<ServiceScheduling>({} as ServiceScheduling)

    const deleteScheduling = () => {
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetScheduling)
        }
        fetch(DELETE_SCHEDULING, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingSchedulings = servicesScheduling.filter(scheduling => {
                            return scheduling._id !== targetScheduling._id
                        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
                        setServicesScheduling(remainingSchedulings)
                        // Salvando em cache
                        sessionStorage.setItem(BACKEND_SCHEDULINGS, JSON.stringify(remainingSchedulings))
                        break
                    case 503:                        
                        setTimeout(() => {
                            alert(DB_ERROR_TEXT)
                        }, 100)
                        break
                }
                setDeleteSchedulingForm(false)
            }).catch(() => {
                setDeleteSchedulingForm(false)
                setTimeout(() => {
                    alert(SERVER_ERROR_TEXT)
                }, 100)
            })
    }

    return (
        <div className='table-container mb-4'>
            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {servicesScheduling.map(scheduling => {
                        return (
                            <SchedulingRow 
                                key={scheduling._id}
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
                ? <DeleteForm 
                        setDeleteForm={setDeleteSchedulingForm} 
                        deleteTarget={deleteScheduling}
                    />
                : null
            }
        </div>
    )

}

export default SchedulingTable