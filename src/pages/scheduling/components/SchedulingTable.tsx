import { ServiceScheduling } from '../../../types/services'

interface Props {
    servicesScheduling: ServiceScheduling[]
}

const Index = ({ servicesScheduling }: Props) => {

    return (
        <table className='table text-center'>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Serviço</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {servicesScheduling.map(scheduling => {
                    return (
                        <tr>
                            <td>{scheduling.client}</td>
                            <td>{scheduling.service.name}</td>
                            <td>{scheduling.date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

export default Index