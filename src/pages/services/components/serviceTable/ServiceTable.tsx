import { useContext } from 'react'
import ServiceRow from './ServiceRow'
import { Service } from '../../../../types/services'
import { tableStyle } from '../../../../commonStyles'
import { ServicesContext } from '../../../../ServicesContext'
import { changeFormState } from '../../../../formFunctions/GenericForm'
import { SERVER_URL } from '../../../../App'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT, BLOCKED_ACTIONS_TEXT } from '../../Services'

interface Props {
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>
    blockedActionsState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const ServiceTable = ({ setEditForm, blockedActionsState }: Props) => {

    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const deleteService = (targetService: Service, button: React.RefObject<HTMLButtonElement>) => {
        if (!blockedActions) {
            if (button.current) button.current.innerText = '...'
            setBlockedActions(true)
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
                        alert(DB_ERROR_TEXT)
                        if (button.current) button.current.innerText = 'Excluir'
                        break
                }
                setBlockedActions(false)
            }).catch(() => {
                alert(SERVER_ERROR_TEXT)
                setBlockedActions(false)
                if (button.current) button.current.innerText = 'Excluir'
            })
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }

    const setEditValuesInTheForm = (name: string, value: number) => {
        if (!blockedActions) {
            setBlockedActions(true)
            changeFormState(name, value.toString(), 'Editar Serviço')
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
                        <ServiceRow service={service} deleteService={deleteService} setEditValuesInTheForm={setEditValuesInTheForm} />)}
                </tbody>
            </table>
        </div>
    )

}

export default ServiceTable