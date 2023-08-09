import { useContext } from 'react'
import ServiceRow from './ServiceRow'
import { Service } from '../../../types/services'
import { ServicesContext } from '../../../ServicesContext'
import { changeFormState } from '../../../formFunctions/GenericForm'
import { SERVER_URL } from '../../../App'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT, BLOCKED_ACTIONS_TEXT } from '../../Index'

interface Props {
    setSearchKey: React.Dispatch<React.SetStateAction<string>>
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>
    blockedActions: boolean
    setBlockedActions: React.Dispatch<React.SetStateAction<boolean>>
}

const Index = ({ setSearchKey, setEditForm, blockedActions, setBlockedActions }: Props) => {

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
            setTimeout(() => {
                fetch(`${SERVER_URL}/delete-service`, options)
                .then(res => {
                    switch (res.status) {
                        case 204:
                            const remainingServices = services.filter(service => {
                                return service.name !== targetService.name
                            })
                            setServices(remainingServices)
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
            }, 5000)
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }

    const setEditValuesInTheForm = (name: string, value: number) => {
        if (!blockedActions) {
            setBlockedActions(true)
            changeFormState(name, value.toString(), 'Editar Serviço')
            setSearchKey(name)
            setEditForm(true)
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }

    return (
        <table className='table text-center'>
            <thead>
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
    )

}

export default Index