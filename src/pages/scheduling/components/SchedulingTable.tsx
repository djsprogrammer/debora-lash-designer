import { ServiceScheduling } from '../../../types/services'

interface Props {
    servicesScheduling: ServiceScheduling[]
}

const Index = ({ servicesScheduling }: Props) => {

    return (
        <table className='table text-center mt-4 mb-5'>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Serviço / Valor</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {servicesScheduling.map(scheduling => {

                    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(scheduling.service.value)).replace('R$', '')

                    return (
                        <tr>
                            <td>{scheduling.client}</td>
                            <td>{scheduling.service.name} / {value}</td>
                            <td>{scheduling.date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

export default Index