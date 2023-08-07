import { Service } from '../../../types/services'

interface Props {
    service: Service
    deleteService: (targetService: Service) => void
}

const Index = ({ service, deleteService }: Props) => {

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value))

    const commonStyle = 'btn btn-sm rounded-pill'

    return (
        <tr key={service.name}>
            <td>{service.name}</td>
            <td>{value}</td>
            <td>
                <button className={`${commonStyle} btn-outline-dark me-2`}>Editar</button>
                <button onClick={() => deleteService(service)} className={`${commonStyle} btn-dark`}>Excluir</button>
            </td>
        </tr>
    )

}

export default Index