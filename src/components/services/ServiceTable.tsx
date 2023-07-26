import { Service, Services, SetServices } from '../../types/services'

interface Props {
    services: Services
    setServices: SetServices
}

const ServiceTable = ({ services, setServices }: Props) => {

    const deleteService = (targetService: Service) => {
        const remainingServices = services.filter(service => {
            return service.name !== targetService.name
        })
        setServices(remainingServices)
    }

    return (
        <table className='table my-4 text-center'>
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {services.map(service => {
                    return (
                        <tr key={service.name}>
                            <td>{service.name}</td>
                            <td>{service.value}</td>
                            <td>
                                <button className='btn btn-sm btn-primary me-2'>Editar</button>
                                <button onClick={() => deleteService(service)} className='btn btn-sm btn-danger'>Excluir</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

export default ServiceTable