import { Service } from '../../../../types/services'

interface Props {
    service: Service
    deleteService: (targetService: Service) => void
}

const Index = ({ service, deleteService }: Props) => {

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value))

    return (
        <tr key={service.name}>
            <td>{service.name}</td>
            <td>{value}</td>
            <td>
                <button onClick={() => deleteService(service)} className='btn btn-sm btn-dark rounded-pill'>Excluir</button>
            </td>
        </tr>
    )

}

export default Index