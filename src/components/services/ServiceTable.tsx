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
        <table className='table table-striped my-4 text-center'>
            <thead>
                <tr className='table-secondary'>
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