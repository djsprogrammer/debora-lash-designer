import { useContext, useState, useEffect } from 'react'
import ServiceTable from 'components/services/ServiceTable'
import AddServiceForm from 'components/services/AddServiceForm'
import AnyServiceAdvice from 'components/pages/AnyAdvice'
import { ServicesContext } from 'ServicesContext'
import { container } from 'commonStyles'
import { Props } from 'types/pages'

const Services = ({ setCurrentPage }: Props) => {

    useEffect(() => {
        setCurrentPage(1)
    }, [setCurrentPage])

    const [services] = useContext(ServicesContext)
    const [blockedActions, setBlockedActions] = useState(false)

    return (
        <div className={container}>
            {services[0] 
            ? <ServiceTable blockedActionsState={[blockedActions, setBlockedActions]} /> 
            : <AnyServiceAdvice page='serviço' />}
            <AddServiceForm blockedActionsState={[blockedActions, setBlockedActions]} />
        </div>
    )

}

export default Services