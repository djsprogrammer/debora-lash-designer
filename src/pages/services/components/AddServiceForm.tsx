import { useEffect, useContext, useState, useRef } from 'react'
import { defaultInputValue, validNumber } from '../../../formFunctions/AddServiceForm'
import { ServicesContext } from '../../../ServicesContext'

interface Props {
    inputsToEdit: string[]
}

const Index = ({ inputsToEdit }: Props) => {

    const [services, setServices] = useContext(ServicesContext)

    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (inputsToEdit[0]) {
            if (nameInput.current && valueInput.current) {
                nameInput.current.value = inputsToEdit[0]
                valueInput.current.value = inputsToEdit[1]
            }
            if (button.current) {
                button.current.innerText = 'Editar Serviço'
            }
        }
    }, [inputsToEdit])

    const addService = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const alreadyExists = services.filter(service => service.name === name)
        if (!alreadyExists[0]) {
            if (validNumber(value)) {
                setServices(services => [...services, { name, value }])
                defaultInputValue(nameInput, valueInput)
            } else {
                alert('Insira um número válido (utilize ponto para casas decimais)')
            }
        } else {
            alert('Já existe um serviço com esse nome!')
        }
    }

    return (
        <form className='d-flex justify-content-center' onSubmit={e => addService(e)}>
            <input ref={nameInput} className='text-center' onChange={e => setName(e.target.value)} type='text' placeholder='Nome' required />
            <input ref={valueInput} className='mx-2 text-center' onChange={e => setValue(e.target.value)} type='text' placeholder='Valor' required />
            <button ref={button} className='btn btn-dark' type='submit'>Adicionar Serviço</button>
        </form>
    )

}

export default Index