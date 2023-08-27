import { useContext, useState } from 'react'
import ServiceRow from './ServiceRow'
import DeleteForm from 'components/pages/DeleteForm'
import { Service } from 'types/services'
import { BooleanState, ButtonRef } from 'types/common'
import { tableStyle } from 'commonStyles'
import { ServicesContext } from 'ServicesContext'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT } from 'errorAdvices'

interface Props {
    blockedActionsState: BooleanState
}

const ServiceTable = ({ blockedActionsState }: Props) => {

    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [targetService, setTargetService] = useState<Service>({} as Service)
    const [possibleToCancel, setPossibleToCancel] = useState(true)
    
    const deleteService = (buttonRef: ButtonRef) => {
        if (buttonRef.current) buttonRef.current.innerText = '...'
        setPossibleToCancel(false)
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetService)
        }
        fetch(`${SERVER_URL}/delete-service`, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingServices = services.filter(service => {
                            return service.name !== targetService.name
                        })
                        setServices(remainingServices.sort((a, b) => a.value - b.value))
                        break
                    case 503:
                        setTimeout(() => {
                            alert(DB_ERROR_TEXT)
                        }, 100)
                        break
                }
                setDeleteServiceForm(false)
                setPossibleToCancel(true)
                setBlockedActions(false)
            }).catch(() => {
                setDeleteServiceForm(false)
                setPossibleToCancel(true)
                setBlockedActions(false)
                setTimeout(() => {
                    alert(SERVER_ERROR_TEXT)
                }, 100)
            })        
    }

    return (
        <div className='table-container'>
            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service =>
                        <ServiceRow
                            service={service}
                            setTargetService={setTargetService}
                            setDeleteServiceForm={setDeleteServiceForm}
                        />)}
                </tbody>
            </table>
            {
                deleteServiceForm
                ? <DeleteForm 
                    deleteTarget={deleteService}
                    possibleToCancel={possibleToCancel}
                    setDeleteForm={setDeleteServiceForm}
                    />
                : null
            }
        </div>
    )

}

export default ServiceTable