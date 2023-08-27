import { useContext, useState, useEffect } from 'react'
import ServiceTable from 'components/services/ServiceTable'
import AddServiceForm from 'components/services/AddServiceForm'
import AnyServiceAdvice from 'components/pages/AnyAdvice'
import RegisterButton from 'components/pages/RegisterButton'
import { ServicesContext } from 'ServicesContext'
import { container } from 'commonStyles'
import { Props } from 'types/pages'

const Services = ({ setCurrentPage }: Props) => {

    useEffect(() => {
        setCurrentPage(1)
    }, [setCurrentPage])

    const [services] = useContext(ServicesContext)
    const [addServiceForm, setAddServiceForm] = useState(false)
    const [blockedActions, setBlockedActions] = useState(false)

    return (
        <div className={container}>
            {
                services[0] 
                ? <ServiceTable blockedActionsState={[blockedActions, setBlockedActions]} /> 
                : <AnyServiceAdvice page='serviço' />
            }
            {
                addServiceForm
                ? <AddServiceForm blockedActionsState={[blockedActions, setBlockedActions]} setAddServiceForm={setAddServiceForm} />
                : <RegisterButton setForm={setAddServiceForm} text='Registrar' />
            }
        </div>
    )

}

export default Services