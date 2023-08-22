import { useContext, useState, useEffect } from 'react'
import ServiceTable from 'components/services/ServiceTable'
import GenericForm from 'components/services/GenericForm'
import AnyServiceAdvice from 'components/pages/AnyAdvice'
import { ServicesContext } from 'ServicesContext'
import { container } from 'commonStyles'
import { Props } from 'types/pages'

const Services = ({ setCurrentPage }: Props) => {

    useEffect(() => {
        setCurrentPage(2)
    }, [setCurrentPage])

    const [services] = useContext(ServicesContext)
    const [editForm, setEditForm] = useState(false)
    const [blockedActions, setBlockedActions] = useState(false)

    return (
        <div className={container}>
            {services[0] 
            ? <ServiceTable setEditForm={setEditForm} blockedActionsState={[blockedActions, setBlockedActions]} /> 
            : <AnyServiceAdvice page='serviço' />}
            <GenericForm editFormState={[editForm, setEditForm]} blockedActionsState={[blockedActions, setBlockedActions]} />
        </div>
    )

}

export default Services