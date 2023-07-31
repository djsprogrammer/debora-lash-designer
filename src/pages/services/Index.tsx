import { useContext, useEffect } from 'react'
import ServiceTable from './components/serviceTable/Index'
import AddServiceForm from './components/AddServiceForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../../ServicesContext'

const Index = () => {

    const [services, setServices] = useContext(ServicesContext)

    useEffect(() => {
        console.log(services)
    }, [services])

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable services={services} setServices={setServices} /> :
                <AnyServiceAdvice />}
            <AddServiceForm services={services} setServices={setServices} />
        </div>
    )

}

export default Index