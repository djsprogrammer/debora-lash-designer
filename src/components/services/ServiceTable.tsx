import { useContext, useState } from 'react'

import { orderServices } from 'formFunctions/common'
import { tableStyle } from 'commonStyles'

import { Service } from 'types/services'

import ServiceFilterInput from './ServiceFilterInput'
import ServiceRow from './ServiceRow'
import DeleteForm from 'components/pages/DeleteForm'
import EditServiceForm from './EditServiceForm'

import { DocsContext } from 'DocsContext'

const ServiceTable = () => {

    const [services, setServices] = useContext(DocsContext).services

    const [serviceFilter, setServiceFilter] = useState('')
    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [editServiceForm, setEditServiceForm] = useState(false)
    const [idForDeletion, setIdForDeletion] = useState('')
    const [serviceForEdition, setServiceForEdition] = useState<Service>({} as Service)

    
    const deleteService = () => {
        const remainingServices = services.filter(service => {
            return service._id !== idForDeletion
        })
        setServices(orderServices(remainingServices))
        setDeleteServiceForm(false)
    }

    const filteredServices = () => {
        if (serviceFilter) {
            return services.filter(service => {
                return service.category === serviceFilter
            })
        }
        return services
    }

    return (
        <div className='w-100'>
            <ServiceFilterInput setServiceFilter={setServiceFilter} />
            <div className='mt-1 mb-4 table-container'>
                <table className={`${tableStyle} mt-2`}>
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServices().map(service =>
                            <ServiceRow
                                key={service._id}
                                service={service}
                                setIdForDeletion={setIdForDeletion}
                                setServiceForEdition={setServiceForEdition}
                                setDeleteServiceForm={setDeleteServiceForm}
                                setEditServiceForm={setEditServiceForm}
                            />)}
                    </tbody>
                </table>
            </div>
            {
                deleteServiceForm
                ? <DeleteForm 
                    deleteTarget={deleteService}
                    setDeleteForm={setDeleteServiceForm}
                    />
                : null
            }
            {
                editServiceForm
                ? <EditServiceForm
                    servicesState={[services, setServices]}
                    serviceForEdition={serviceForEdition}
                    setEditServiceForm={setEditServiceForm}
                    />
                : null
            }
        </div>
    )

}

export default ServiceTable