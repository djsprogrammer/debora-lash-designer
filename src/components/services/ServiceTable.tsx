import { Services } from '../../types/services'

interface Props {
    services: Services
}

const ServiceTable = ({ services }: Props) => {

    return (
        <table className='table my-4'>
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                {services.map(service => {
                    return (
                        <tr>
                            <td>{service.name}</td>
                            <td>{service.value}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

export default ServiceTable