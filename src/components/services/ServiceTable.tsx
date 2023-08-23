import { useContext, useState } from 'react'
import ServiceRow from './ServiceRow'
import DeleteServiceForm from './DeleteServiceForm'
import { Service, Button } from 'types/services'
import { tableStyle } from 'commonStyles'
import { ServicesContext } from 'ServicesContext'
import { changeFormState } from 'formFunctions/GenericForm'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT, BLOCKED_ACTIONS_TEXT } from 'errorAdvices'

interface Props {
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>
    blockedActionsState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ServiceTable = ({ setEditForm, blockedActionsState }: Props) => {

    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [targetService, setTargetService] = useState<Service>({} as Service)
    const [possibleToCancel, setPossibleToCancel] = useState(true)

    const showDeleteServiceForm = () => {
        if (!blockedActions) {
            setBlockedActions(true)
            setDeleteServiceForm(true)
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }
    
    const deleteService = (button: Button) => {
        if (button.current) button.current.innerText = '...'
        setPossibleToCancel(false)
        changeFormState('', '')
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

    const cancelDelete = () => {
        setBlockedActions(false)
        setDeleteServiceForm(false)
    }

    const setEditValuesInTheForm = (name: string, value: number) => {
        if (!blockedActions) {
            setBlockedActions(true)
            changeFormState(name, value.toString(), 'Editar')
            setEditForm(true)
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }

    return (
        <div className='table-container'>
            <table className={tableStyle}>
                <thead className='table-dark'>
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
                            showDeleteServiceForm={showDeleteServiceForm}
                            setEditValuesInTheForm={setEditValuesInTheForm} 
                        />)}
                </tbody>
            </table>
            {
                deleteServiceForm
                ? <DeleteServiceForm 
                    deleteService={deleteService}
                    possibleToCancel={possibleToCancel}
                    cancelDelete={cancelDelete}
                    />
                : null
            }
        </div>
    )

}

export default ServiceTable