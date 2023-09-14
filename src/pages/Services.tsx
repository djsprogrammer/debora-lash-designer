import { useContext, useState, useEffect } from 'react'

import { container } from 'commonStyles'

import { Props } from 'types/pages'

import ServiceTable from 'components/services/ServiceTable'
import AnyServiceAdvice from 'components/pages/AnyAdvice'
import AddServiceForm from 'components/services/AddServiceForm/AddServiceForm'
import RegisterButton from 'components/pages/RegisterButton'

import { DocsContext } from 'DocsContext'

const Services = ({ setCurrentPage }: Props) => {

    useEffect(() => {
        setCurrentPage(3)
    }, [setCurrentPage])

    const [services] = useContext(DocsContext).services
    const [addServiceForm, setAddServiceForm] = useState(false)

    return (
        <div className={container}>
            {
                services[0] 
                ? <ServiceTable /> 
                : <AnyServiceAdvice page='serviço' />
            }
            {
                addServiceForm
                ? <AddServiceForm setAddServiceForm={setAddServiceForm} />
                : <RegisterButton setForm={setAddServiceForm} text='Registrar' />
            }
        </div>
    )

}

export default Services