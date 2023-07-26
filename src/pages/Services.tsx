import { useState } from 'react'
import { Services as TServices } from '../types/services'
import ServiceTable from '../components/services/ServiceTable'

const Services = () => {

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [services, setServices] = useState<TServices>([])

    const addService = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const newService = { name, value }
        setServices(services => [...services, newService])
    }

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            <ServiceTable services={services} />
            <form className='d-flex justify-content-center' onSubmit={e => addService(e)}>
                <input className='text-center' onChange={e => setName(e.target.value)} type='text' placeholder='Nome' required />
                <input className='mx-2 text-center' onChange={e => setValue(e.target.value)} type='text' placeholder='Valor' required />
                <button className='btn btn-dark' type='submit'>Adicionar Serviço</button>
            </form>
        </div>
    )

}

export default Services