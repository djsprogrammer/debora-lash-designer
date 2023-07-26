import { Services } from '../../types/services'

interface Props {
    services: Services
}

const ServiceTable = ({ services }: Props) => {

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
                        <tr>
                            <td>{service.name}</td>
                            <td>{service.value}</td>
                            <td>
                                <button className='btn btn-sm btn-primary me-2'>Editar</button>
                                <button className='btn btn-sm btn-danger'>Excluir</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

export default ServiceTable