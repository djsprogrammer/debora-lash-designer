import { Service } from "../../../../types/services"

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
                <button className='btn btn-sm btn-primary me-1'>Editar</button>
                <button onClick={() => deleteService(service)} className='btn btn-sm btn-danger'>Excluir</button>
            </td>
        </tr>
    )

}

export default Index