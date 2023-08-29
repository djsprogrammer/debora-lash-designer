import { useContext, useState } from 'react'
import ServiceRow from './ServiceRow'
import DeleteForm from 'components/pages/DeleteForm'
import { Service } from 'types/services'
import { tableStyle } from 'commonStyles'
import { ServicesContext } from 'ServicesContext'
import { DELETE_SERVICE } from 'constants/urls'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT } from 'errorAdvices'

const ServiceTable = () => {

    const [services, setServices] = useContext(ServicesContext)

    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [targetService, setTargetService] = useState<Service>({} as Service)
    
    const deleteService = () => {
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetService)
        }
        fetch(DELETE_SERVICE, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingServices = services.filter(service => {
                            return service._id !== targetService._id
                        })
                        setServices(remainingServices.sort((a, b) => a.value - b.value))
                        break
                    case 503:
                        setTimeout(() => {
                            alert(DB_ERROR_TEXT)
                        }, 100)
                        break
                }
                setDeleteServiceForm(false)
            }).catch(() => {
                setDeleteServiceForm(false)
                setTimeout(() => {
                    alert(SERVER_ERROR_TEXT)
                }, 100)
            })
    }

    return (
        <div className='table-container'>
            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Valor</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service =>
                        <ServiceRow
                            service={service}
                            setTargetService={setTargetService}
                            setDeleteServiceForm={setDeleteServiceForm}
                        />)}
                </tbody>
            </table>
            {
                deleteServiceForm
                ? <DeleteForm 
                    deleteTarget={deleteService}
                    setDeleteForm={setDeleteServiceForm}
                    />
                : null
            }
        </div>
    )

}

export default ServiceTable