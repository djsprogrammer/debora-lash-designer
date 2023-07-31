import { useContext } from 'react'
import ServiceTable from './components/serviceTable/Index'
import AddServiceForm from './components/AddServiceForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../../ServicesContext'

const Index = () => {

    const [services] = useContext(ServicesContext)

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable /> : <AnyServiceAdvice />}
            <AddServiceForm />
        </div>
    )

}

export default Index