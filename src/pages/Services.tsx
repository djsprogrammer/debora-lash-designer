import { useState } from 'react'
import { Services as TServices } from '../types/services'
import ServiceTable from '../components/services/ServiceTable'
import AddServiceForm from '../components/services/AddServiceForm'
import AnyServiceAdvice from '../components/services/AnyServiceAdvice'

const Services = () => {

    const [services, setServices] = useState<TServices>([])

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable services={services} setServices={setServices} /> :
                <AnyServiceAdvice />}
            <AddServiceForm setServices={setServices} />
        </div>
    )

}

export default Services