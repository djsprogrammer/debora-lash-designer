import { useEffect, useContext, useRef } from 'react'
import { 
    getServiceInfo, setButtonText, validNumber, saveReferenciesOnMemory, 
    showError, responseHandler, fetchOptions 
} from '../../formFunctions/GenericForm'
import { ServicesContext } from 'ServicesContext'
import { SERVER_URL } from 'App'
import { formButtonStyle } from 'commonStyles'
import { SERVER_ERROR_TEXT, DB_ERROR_TEXT, BLOCKED_ACTIONS_TEXT } from 'errorAdvices'
import { BooleanState } from 'types/common'

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const LOAD_BUTTON_TEXT = '...'
const INVALID_NUMBER_TEXT = 'Insira um número válido (utilize ponto para casas decimais)'
const ALREADY_EXISTS_TEXT = 'Já existe um serviço com esse nome!'

interface Props {
    editFormState: BooleanState
    blockedActionsState: BooleanState
}

const GenericForm = ({ editFormState, blockedActionsState }: Props) => {

    const [editForm, setEditForm] = editFormState
    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const nameGroup = useRef<HTMLDivElement>(null)
    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        saveReferenciesOnMemory(nameInput, valueInput, button)
    }, [])

    // Deixando o nome indisponível para modificar
    useEffect(() => {
        if (nameGroup.current) {
            if (editForm) {
                nameGroup.current.style.display = 'none'
            } else {
                nameGroup.current.style.display = 'flex'
            }
        }
    }, [editForm])

    const addService = () => {
        if (!blockedActions) {
            setBlockedActions(true)
            setButtonText(LOAD_BUTTON_TEXT)
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
                        }).catch(() => {
                            showError(SERVER_ERROR_TEXT, setBlockedActions)
                        })
                } else {
                    showError(INVALID_NUMBER_TEXT, setBlockedActions)
                }
            } else {
                showError(ALREADY_EXISTS_TEXT, setBlockedActions)
            }
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }

    const editService = () => {
        setButtonText(LOAD_BUTTON_TEXT)
        const [name, value] = getServiceInfo()
        if (validNumber(value)) {
            const service = { name, value: Number(value) }
            const options = fetchOptions('put', service)
            fetch(`${SERVER_URL}/edit-service`, options)
                .then(res => {
                    const otherServices = services.filter(service => {
                        return service.name !== name
                    })
                    const newServices = [...otherServices, { name, value: Number(value) }]
                    responseHandler(
                        res, 204, setServices, newServices, 
                        DB_ERROR_TEXT, ADD_BUTTON_TEXT, setBlockedActions
                    )
                    setEditForm(false)
                }).catch(() => {
                    showError(SERVER_ERROR_TEXT, setBlockedActions)
                    setEditForm(false)
                })
        } else {
            showError(INVALID_NUMBER_TEXT, setBlockedActions)
            setEditForm(false)
        }
    }

    return (
        <form className='d-flex flex-column' onSubmit={e => {
            e.preventDefault()
            editForm ? editService() : addService()
        }}>
            <div ref={nameGroup} className='input-group'>
                <label className='input-group-text' htmlFor='services'>Nome</label>
                <input ref={nameInput} className='form-control text-center' type='text' required />
            </div>
            <div className='input-group my-3'>
                <label className='input-group-text' htmlFor='services'>Valor</label>
                <input ref={valueInput} className='form-control text-center' type='text' required />
            </div>
            <button ref={button} className={formButtonStyle} type='submit'>{ADD_BUTTON_TEXT}</button>
        </form>
    )

}

export default GenericForm