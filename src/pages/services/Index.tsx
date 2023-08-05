import { useContext } from 'react'
import ServiceTable from './components/serviceTable/Index'
import GenericForm from './components/GenericForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../../ServicesContext'

const Index = () => {

    const [services] = useContext(ServicesContext)

    return (
        <div className='container'>
            <h4 className='my-4 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable /> : <AnyServiceAdvice />}
            <GenericForm />
        </div>
    )

}

export default Index