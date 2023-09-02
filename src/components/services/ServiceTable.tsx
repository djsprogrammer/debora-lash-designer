import { useContext, useState } from 'react'
import ServiceRow from './ServiceRow'
import DeleteForm from 'components/pages/DeleteForm'
import { tableStyle } from 'commonStyles'
import { ServicesContext } from 'ServicesContext'
import { DELETE_SERVICE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { deleteFetchOptions, orderServices } from 'formFunctions/common'

const ServiceTable = () => {

    const [services, setServices] = useContext(ServicesContext)

    const [deleteServiceForm, setDeleteServiceForm] = useState(false)
    const [targetId, setTargetId] = useState('')
    
    const deleteService = () => {
        const options = deleteFetchOptions(targetId)
        fetch(DELETE_SERVICE, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingServices = services.filter(service => {
                            return service._id !== targetId
                        })
                        setServices(orderServices(remainingServices))
                        break
                    case 503:
                        setTimeout(() => {
                            alert(DATABASE_ERROR_TEXT)
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
                            key={service._id}
                            service={service}
                            setTargetId={setTargetId}
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