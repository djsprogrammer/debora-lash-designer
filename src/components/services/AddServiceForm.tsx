import { useState } from 'react'
import { SetServices } from '../../types/services'

interface Props {
    setServices: SetServices
}

const AddServiceForm = ({ setServices }: Props) => {

    const [name, setName] = useState('')
    const [value, setValue] = useState('')

    const addService = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newService = { name, value }
        setServices(services => [...services, newService])
    }

    return (
        <form className='d-flex justify-content-center' onSubmit={e => addService(e)}>
            <input className='text-center' onChange={e => setName(e.target.value)} type='text' placeholder='Nome' required />
            <input className='mx-2 text-center' onChange={e => setValue(e.target.value)} type='text' placeholder='Valor' required />
            <button className='btn btn-dark' type='submit'>Adicionar Serviço</button>
        </form>
    )

}

export default AddServiceForm