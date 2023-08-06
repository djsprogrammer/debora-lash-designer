import { useContext } from 'react'
import ServiceRow from './ServiceRow'
import { Service } from '../../../types/services'
import { ServicesContext } from '../../../ServicesContext'
import { changeFormState } from '../../../formFunctions/GenericForm'
import { SERVER_URL } from '../../../App'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT } from '../../Index'

const Index = () => {

    const [services, setServices] = useContext(ServicesContext)

    const deleteService = (targetService: Service) => {
        changeFormState()
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetService)
        }
        setTimeout(() => {
            fetch(`${SERVER_URL}/delete-service`, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingServices = services.filter(service => {
                            return service.name !== targetService.name
                        })
                        setServices(remainingServices)
                        break
                    case 503:
                        alert(DB_ERROR_TEXT)
                        break
                }
            }).catch(() => {
                alert(SERVER_ERROR_TEXT)
            })
        }, 500)
    }

    return (
        <table className='table text-center'>
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {services.map(service =>
                    <ServiceRow service={service} deleteService={deleteService} />)}
            </tbody>
        </table>
    )

}

export default Index