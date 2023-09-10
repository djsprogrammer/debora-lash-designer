import { useContext, useState, useEffect } from 'react'

import { container } from 'commonStyles'

import { Props } from 'types/pages'

import ServiceTable from 'components/services/ServiceTable'
import AnyServiceAdvice from 'components/pages/AnyAdvice'
import AddServiceForm from 'components/services/AddServiceForm/AddServiceForm'
import RegisterButton from 'components/pages/RegisterButton'

import { ServicesContext } from 'ServicesContext'

const Services = ({ setCurrentPage }: Props) => {

    useEffect(() => {
        setCurrentPage(1)
    }, [setCurrentPage])

    const [services] = useContext(ServicesContext)
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