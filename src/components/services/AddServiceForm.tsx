import { useState, useRef } from 'react'
import { SetServices } from '../../types/services'

interface Props {
    setServices: SetServices
}

const AddServiceForm = ({ setServices }: Props) => {

    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)

    const addService = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newService = { name, value }
        setServices(services => [...services, newService])
        if (nameInput.current && valueInput.current) {
            nameInput.current.value = ''
            valueInput.current.value = ''
        }
    }

    return (
        <form className='d-flex justify-content-center' onSubmit={e => addService(e)}>
            <input ref={nameInput} className='text-center' onChange={e => setName(e.target.value)} type='text' placeholder='Nome' required />
            <input ref={valueInput} className='mx-2 text-center' onChange={e => setValue(e.target.value)} type='text' placeholder='Valor' required />
            <button className='btn btn-dark' type='submit'>Adicionar Serviço</button>
        </form>
    )

}

export default AddServiceForm