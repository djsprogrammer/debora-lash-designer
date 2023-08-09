import { useEffect, useContext, useRef } from 'react'
import { inputsValues, setButtonText, validNumber, changeFormState, saveReferenciesOnMemory } from '../../formFunctions/GenericForm'
import { ServicesContext } from '../../ServicesContext'
import { SERVER_URL } from '../../App'
import { SERVER_ERROR_TEXT, DB_ERROR_TEXT, BLOCKED_ACTIONS_TEXT } from '../Index'

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const LOAD_BUTTON_TEXT = 'Carregando...'

interface Props {
    searchKey: string
    editForm: boolean
    setEditForm: React.Dispatch<React.SetStateAction<boolean>>
    blockedActions: boolean
    setBlockedActions: React.Dispatch<React.SetStateAction<boolean>>
}

const Index = ({ searchKey, editForm, setEditForm, blockedActions, setBlockedActions }: Props) => {

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
                                    setServices(newServices.sort((a, b) => a.value - b.value))
                                    changeFormState('', '', ADD_BUTTON_TEXT)
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
                    setButtonText(ADD_BUTTON_TEXT)
                    setBlockedActions(false)
                }
            } else {
                alert('Já existe um serviço com esse nome!')
                setButtonText(ADD_BUTTON_TEXT)
                setBlockedActions(false)
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
                            setServices(newServices.sort((a, b) => a.value - b.value))
                            changeFormState('', '', ADD_BUTTON_TEXT)
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
        <form className='my-4 d-flex justify-content-center' onSubmit={e => {
            e.preventDefault()
            editForm ? editService() : addService()
        }}>
            <input ref={nameInput} className='text-center rounded-pill border border-secondary' type='text' placeholder='Nome' required />
            <input ref={valueInput} className='mx-2 text-center rounded-pill border border-secondary' type='text' placeholder='Valor' required />
            <button ref={button} className='btn btn-dark rounded-pill' type='submit'>{ADD_BUTTON_TEXT}</button>
        </form>
    )

}

export default Index