import { useState } from 'react'
import { Services as TServices } from '../../types/services'
import ServiceTable from './components/serviceTable/Index'
import AddServiceForm from './components/AddServiceForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'

const Index = () => {

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

export default Index