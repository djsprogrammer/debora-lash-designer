import { useEffect, useContext, useState, useRef, SetStateAction } from 'react'
import { inputsValues, setButtonText, setInputValue, validNumber } from '../../../formFunctions/GenericForm'
import { ServicesContext } from '../../../ServicesContext'

interface Props {
    inputsToEdit: string[]
    setInputsToEdit: React.Dispatch<SetStateAction<string[]>>
}

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const EDIT_BUTTON_TEXT = 'Editar Serviço'
const LOAD_BUTTON_TEXT = 'Carregando...'
const POST_URL = 'http://localhost:8080/create-service'

const Index = ({ inputsToEdit, setInputsToEdit }: Props) => {

    const [services, setServices] = useContext(ServicesContext)

    const [editForm, setEditForm] = useState(false)

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (inputsToEdit[0]) {
            setInputValue(nameInput, valueInput, inputsToEdit[0], inputsToEdit[1])
            setButtonText(button, EDIT_BUTTON_TEXT)
            setEditForm(true)
        } else {
            setInputValue(nameInput, valueInput, '', '')
            setButtonText(button, ADD_BUTTON_TEXT)
            setEditForm(false)
        }
    }, [inputsToEdit])

    const addService = () => {
        setButtonText(button, LOAD_BUTTON_TEXT)
        const [name, value] = inputsValues(nameInput, valueInput)
        const alreadyExists = services.filter(service => service.name === name)
        const options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, value })
        }
        if (!alreadyExists[0]) {
            if (validNumber(value)) {
                fetch(POST_URL, options)
                    .then(() => {
                        setServices(services => [...services, { name, value }])
                        setButtonText(button, ADD_BUTTON_TEXT)
                        setInputsToEdit([])
                    })
            } else {
                alert('Insira um número válido (utilize ponto para casas decimais)')
                setButtonText(button, ADD_BUTTON_TEXT)
            }
        } else {
            alert('Já existe um serviço com esse nome!')
            setButtonText(button, ADD_BUTTON_TEXT)
        }
    }

    const editService = () => {
        const [name, value] = inputsValues(nameInput, valueInput)
        const remainingServices = services.filter(service => {
            return service.name !== name
        })
        setServices([...remainingServices, { name, value }])
        setInputsToEdit([])
    }

    return (
        <form className='d-flex justify-content-center' onSubmit={e => {
            e.preventDefault()
            editForm ? editService() : addService() 
        }}>
            <input ref={nameInput} className='text-center' type='text' placeholder='Nome' required />
            <input ref={valueInput} className='mx-2 text-center' type='text' placeholder='Valor' required />
            <button ref={button} className='btn add-btn' type='submit'>{ADD_BUTTON_TEXT}</button>
        </form>
    )

}

export default Index