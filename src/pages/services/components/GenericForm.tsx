import { useEffect, useContext, useState, useRef } from 'react'
import { setInputValue, validNumber } from '../../../formFunctions/GenericForm'
import { ServicesContext } from '../../../ServicesContext'

interface Props {
    inputsToEdit: string[]
}

const Index = ({ inputsToEdit }: Props) => {

    const [services, setServices] = useContext(ServicesContext)

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [editForm, setEditForm] = useState(false)

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (inputsToEdit[0]) {
            setInputValue(nameInput, valueInput, inputsToEdit[0], inputsToEdit[1])
            if (button.current) {
                button.current.innerText = 'Editar Serviço'
            }
            setEditForm(true)
        }
    }, [inputsToEdit])

    const addService = () => {
        const alreadyExists = services.filter(service => service.name === name)
        if (!alreadyExists[0]) {
            if (validNumber(value)) {
                setServices(services => [...services, { name, value }])
                setInputValue(nameInput, valueInput, '', '')
            } else {
                alert('Insira um número válido (utilize ponto para casas decimais)')
            }
        } else {
            alert('Já existe um serviço com esse nome!')
        }
    }

    const editService = () => {
        console.log({ name, value })
        setInputValue(nameInput, valueInput, '', '')
        if (button.current) {
            button.current.innerText = 'Adicionar Serviço'
        }
        setEditForm(false)
    }

    return (
        <form className='d-flex justify-content-center' onSubmit={e => {
            e.preventDefault()
            editForm ? editService() : addService() 
        }}>
            <input ref={nameInput} className='text-center' onChange={e => setName(e.target.value)} type='text' placeholder='Nome' required />
            <input ref={valueInput} className='mx-2 text-center' onChange={e => setValue(e.target.value)} type='text' placeholder='Valor' required />
            <button ref={button} className='btn btn-dark' type='submit'>Adicionar Serviço</button>
        </form>
    )

}

export default Index