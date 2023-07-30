import ServiceRow from './ServiceRow'
import { Service, Services, SetServices } from '../../../../types/services'

interface Props {
    services: Services
    setServices: SetServices
}

const Index = ({ services, setServices }: Props) => {

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