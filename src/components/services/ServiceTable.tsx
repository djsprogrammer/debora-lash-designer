import { useEffect, useContext, useState } from 'react'
import ServiceRow from './ServiceRow'
import DeleteForm from 'components/pages/DeleteForm'
import { Service } from 'types/services'
import { BooleanState, ButtonRef } from 'types/common'
import { tableStyle } from 'commonStyles'
import { ServicesContext } from 'ServicesContext'
import { changeFormState } from 'formFunctions/GenericForm'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT } from 'errorAdvices'

interface Props {
    editFormState: BooleanState
    blockedActionsState: BooleanState
}

const ServiceTable = ({ editFormState, blockedActionsState }: Props) => {

    const [editForm, setEditForm] = editFormState
    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [targetService, setTargetService] = useState<Service>({} as Service)
    const [possibleToCancel, setPossibleToCancel] = useState(true)

    useEffect(() => {
        if (!deleteServiceForm) setBlockedActions(false)
    }, [deleteServiceForm, setBlockedActions])

    const showDeleteServiceForm = () => {
        if (!blockedActions) {
            setBlockedActions(true) 
            setDeleteServiceForm(true)
        }
    }
    
    const deleteService = (buttonRef: ButtonRef) => {
        if (buttonRef.current) buttonRef.current.innerText = '...'
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

    const setEditValuesInTheForm = (name: string, value: number, row: React.RefObject<HTMLTableRowElement>) => {
        if (!blockedActions) {
            if (row.current) row.current.classList.add('table-light')
            setBlockedActions(true)
            changeFormState(name, value.toString(), 'Editar')
            setEditForm(true)
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
                            editForm={editForm}
                            service={service}
                            setTargetService={setTargetService}
                            showDeleteServiceForm={showDeleteServiceForm}
                            setEditValuesInTheForm={setEditValuesInTheForm} 
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