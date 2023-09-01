import { useState } from 'react'
import SchedulingRow from './SchedulingRow'
import { Props } from 'types/schedulings'
import { tableStyle } from 'commonStyles'
import DeleteForm from 'components/pages/DeleteForm'
import { DELETE_SCHEDULING } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { BACKEND_SCHEDULINGS } from 'pages/Scheduling'

const SchedulingTable = ({ schedulingsState }: Props) => {

    const [servicesScheduling, setServicesScheduling] = schedulingsState

    const [deleteSchedulingForm, setDeleteSchedulingForm] = useState(false)
    const [targetId, setTargetId] = useState('')

    const deleteScheduling = () => {
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'text/plain' },
            body: targetId
        }
        fetch(DELETE_SCHEDULING, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingSchedulings = servicesScheduling.filter(scheduling => {
                            return scheduling._id !== targetId
                        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
                        setServicesScheduling(remainingSchedulings)
                        // Salvando em cache
                        localStorage.setItem(BACKEND_SCHEDULINGS, JSON.stringify(remainingSchedulings))
                        break
                    case 503:                        
                        setTimeout(() => {
                            alert(DATABASE_ERROR_TEXT)
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
                                setTargetId={setTargetId}
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