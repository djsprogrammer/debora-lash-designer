import { useEffect, useContext, useRef } from 'react'
import AddFormButtons from 'components/pages/AddFormButtons'
import { 
    getServiceInfo, saveRefsInMemory, 
    showError, responseHandler 
} from '../../formFunctions/AddServiceForm'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { ServicesContext } from 'ServicesContext'
import { SERVER_URL } from 'App'
import { addFormContainer, addFormCardStyle } from 'commonStyles'
import { SERVER_ERROR_TEXT, DB_ERROR_TEXT } from 'errorAdvices'
import { BooleanState, BooleanSet } from 'types/common'

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const INVALID_NUMBER_TEXT = 'Insira um número válido (utilize ponto para casas decimais)'
const ALREADY_EXISTS_TEXT = 'Já existe um serviço com esse nome!'

interface Props {
    blockedActionsState: BooleanState
    setAddServiceForm: BooleanSet
}

const AddServiceForm = ({ blockedActionsState, setAddServiceForm }: Props) => {

    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const nameGroup = useRef<HTMLDivElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        saveRefsInMemory(nameInput, valueInput)
    }, [])

    const addService = () => {
        if (!blockedActions) {
            setBlockedActions(true)
            const [name, value] = getServiceInfo()
            const alreadyExists = services.filter(service => service.name === name)[0]
            if (!alreadyExists) {
                if (validNumber(value)) {
                    const service = {
                        name, value: Number(value)
                    }
                    const options = fetchOptions('post', service)
                        fetch(`${SERVER_URL}/create-service`, options)
                        .then(res => {
                            const newServices = [...services, service]
                            responseHandler(
                                res, 201, setServices, newServices, 
                                DB_ERROR_TEXT, ADD_BUTTON_TEXT, setBlockedActions
                            )
                            setAddServiceForm(false)
                        }).catch(() => {
                            showError(SERVER_ERROR_TEXT, setBlockedActions)
                            setAddServiceForm(false)
                        })
                } else {
                    showError(INVALID_NUMBER_TEXT, setBlockedActions)
                    setAddServiceForm(false)
                }
            } else {
                showError(ALREADY_EXISTS_TEXT, setBlockedActions)
                setAddServiceForm(false)
            }
        }
    }

    return (
        <div className={addFormContainer}>
            <div className={addFormCardStyle}>
                <form className='d-flex flex-column' onSubmit={e => {
                    e.preventDefault()
                    addService()
                }}>
                    <div ref={nameGroup} className='input-group'>
                        <label className='input-group-text' htmlFor='services'>Nome</label>
                        <input ref={nameInput} className='form-control text-center' type='text' required />
                    </div>
                    <div className='input-group my-3'>
                        <label className='input-group-text' htmlFor='services'>Valor</label>
                        <input ref={valueInput} className='form-control text-center' type='text' required />
                    </div>
                    <AddFormButtons confirmText='Registrar' blockedActions={blockedActions} setAddForm={setAddServiceForm} />
                </form>
            </div>
        </div>
    )

}

export default AddServiceForm