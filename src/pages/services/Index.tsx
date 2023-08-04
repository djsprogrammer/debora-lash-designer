import { useContext, useState } from 'react'
import ServiceTable from './components/serviceTable/Index'
import AddServiceForm from './components/GenericForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../../ServicesContext'

const Index = () => {

    const [services] = useContext(ServicesContext)

    const [inputsToEdit, setInputsToEdit] = useState<string[]>([])

    return (
        <div className='container'>
            <h4 className='my-4 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable setInputsToEdit={setInputsToEdit} /> : <AnyServiceAdvice />}
            <AddServiceForm inputsToEdit={inputsToEdit} setInputsToEdit={setInputsToEdit}/>
        </div>
    )

}

export default Index