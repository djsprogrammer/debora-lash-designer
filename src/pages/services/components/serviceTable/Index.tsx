import { useContext } from 'react'
import ServiceRow from './ServiceRow'
import { Service } from '../../../../types/services'
import { ServicesContext } from '../../../../ServicesContext'

const Index = () => {

    const [services, setServices] = useContext(ServicesContext)

    const deleteService = (targetService: Service) => {
        const remainingServices = services.filter(service => {
            return service.name !== targetService.name
        })
        setServices(remainingServices)
    }

    return (
        <table className='table table-striped my-4 text-center'>
            <thead>
                <tr className='table-secondary'>
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