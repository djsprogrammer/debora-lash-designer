import { useState } from 'react'

interface Service {
    name: string
    value: string
}

const Services = () => {

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [services, setServices] = useState<Service[]>([])

    const addService = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const service = { name, value }
        setServices(state => [...state, service])
    }

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            <table className='table my-4'>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => {
                        return (
                            <tr>
                                <td>{service.name}</td>
                                <td>{service.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <form className='d-flex justify-content-center' onSubmit={e => addService(e)}>
                <input className='text-center' onChange={e => setName(e.target.value)} type='text' placeholder='Nome' required />
                <input className='mx-2 text-center' onChange={e => setValue(e.target.value)} type='text' placeholder='Valor' required />
                <button className='btn btn-dark' type='submit'>Adicionar Serviço</button>
            </form>
        </div>
    )

}

export default Services