import { useContext, useState } from 'react'
import ServiceTable from './components/serviceTable/Index'
import AddServiceForm from './components/AddServiceForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../../ServicesContext'

const Index = () => {

    const [services] = useContext(ServicesContext)

    const [inputsToEdit, setInputsToEdit] = useState<string[]>([])

    return (
        <div className='container'>
            <h4 className='mt-2 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable setInputsToEdit={setInputsToEdit} /> : <AnyServiceAdvice />}
            <AddServiceForm inputsToEdit={inputsToEdit} />
        </div>
    )

}

export default Index