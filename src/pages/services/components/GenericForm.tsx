import { useEffect, useContext, useRef } from 'react'
import { inputsValues, setButtonText, validNumber, changeFormState, saveReferenciesOnMemory, setNewService, showError } from '../../../formFunctions/GenericForm'
import { ServicesContext } from '../../../ServicesContext'
import { SERVER_URL } from '../../../App'
import { formButtonStyle } from '../../../commonStyles'
import { SERVER_ERROR_TEXT, DB_ERROR_TEXT, BLOCKED_ACTIONS_TEXT } from '../Services'

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const LOAD_BUTTON_TEXT = 'Carregando...'
const INVALID_NUMBER_TEXT = 'Insira um número válido (utilize ponto para casas decimais)'
const ALREADY_EXISTS_TEXT = 'Já existe um serviço com esse nome!'

interface Props {
    searchKey: string
    editFormState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    blockedActionsState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const GenericForm = ({ searchKey, editFormState, blockedActionsState }: Props) => {

    const [editForm, setEditForm] = editFormState
    const [blockedActions, setBlockedActions] = blockedActionsState

    const [services, setServices] = useContext(ServicesContext)

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        saveReferenciesOnMemory(nameInput, valueInput, button)
    }, [])

    const addService = () => {
        if (!blockedActions) {
            setBlockedActions(true)
            setButtonText(LOAD_BUTTON_TEXT)
            const [name, value] = inputsValues()
            const alreadyExists = services.filter(service => service.name === name)
            if (!alreadyExists[0]) {
                if (validNumber(value)) {
                    const service = {
                        name, value: Number(value)
                    }
                    const options = {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(service)
                    }
                    fetch(`${SERVER_URL}/create-service`, options)
                        .then(res => {
                            switch (res.status) {
                                case 201:
                                    const newServices = [...services, service]
                                    setNewService(setServices, newServices, ADD_BUTTON_TEXT)
                                    break
                                case 503:
                                    alert(DB_ERROR_TEXT)
                                    changeFormState('', '', ADD_BUTTON_TEXT)
                                    break
                            }
                            setBlockedActions(false)
                        }).catch(() => {
                            showError(SERVER_ERROR_TEXT, ADD_BUTTON_TEXT, setBlockedActions)
                        })
                } else {
                    showError(INVALID_NUMBER_TEXT, ADD_BUTTON_TEXT, setBlockedActions)
                }
            } else {
                showError(ALREADY_EXISTS_TEXT, ADD_BUTTON_TEXT, setBlockedActions)
            }
        } else {
            alert(BLOCKED_ACTIONS_TEXT)
        }
    }

    const editService = () => {
        setEditForm(false)
        setButtonText(LOAD_BUTTON_TEXT)
        const [name, value] = inputsValues()
        if (validNumber(value)) {
            const service = {
                searchKey,
                name,
                value: Number(value)
            }
            const options = {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(service)       
            }
            fetch(`${SERVER_URL}/edit-service`, options)
                .then(res => {
                    const otherServices = services.filter(service => {
                        return service.name !== searchKey
                    })
                    switch (res.status) {
                        case 204:
                            const newServices = [...otherServices, { name, value: Number(value) }]
                            setNewService(setServices, newServices, ADD_BUTTON_TEXT)
                            break
                        case 503:
                            alert(DB_ERROR_TEXT)
                            changeFormState('', '', ADD_BUTTON_TEXT)
                            break
                    }
                    setBlockedActions(false)
                }).catch(() => {
                    alert(SERVER_ERROR_TEXT)
                    changeFormState('', '', ADD_BUTTON_TEXT)
                    setBlockedActions(false)
                })
        } else {
            alert('Insira um número válido (utilize ponto para casas decimais)')
            changeFormState('', '', ADD_BUTTON_TEXT)
            setBlockedActions(false)
        }
    }

    return (
        <form className='d-flex flex-column' onSubmit={e => {
            e.preventDefault()
            editForm ? editService() : addService()
        }}>
            <div className='input-group'>
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