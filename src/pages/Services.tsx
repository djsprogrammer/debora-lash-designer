import { useState } from 'react'
import { Services as TServices } from '../types/services'
import ServiceTable from '../components/services/ServiceTable'
import AddServiceForm from '../components/services/AddServiceForm'

const Services = () => {

    const [services, setServices] = useState<TServices>([])

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            <ServiceTable services={services} />
            <AddServiceForm setServices={setServices} />
        </div>
    )

}

export default Services