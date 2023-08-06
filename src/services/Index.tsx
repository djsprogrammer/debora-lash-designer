import { useContext } from 'react'
import ServiceTable from './components/serviceTable/Index'
import GenericForm from './components/GenericForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../ServicesContext'

export const DB_ERROR_TEXT = 'Erro ao consultar banco de dados'
export const SERVER_ERROR_TEXT = 'Erro ao conectar com o servidor'

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