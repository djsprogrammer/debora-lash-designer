import { useRef, useEffect } from 'react'
import { Pencil, Trash } from 'lucide-react'
import { Service, SetService } from 'types/services'

interface Props {
    editForm: boolean
    service: Service
    setTargetService: SetService
    showDeleteServiceForm: () => void
    setEditValuesInTheForm: (tdName: string, value: number, row: React.RefObject<HTMLTableRowElement>) => void
}

const ServiceRow = ({ editForm, service, setTargetService, showDeleteServiceForm, setEditValuesInTheForm }: Props) => {

    const serviceRowRef = useRef<HTMLTableRowElement>(null)

    useEffect(() => {
        if (!editForm) {
            if (serviceRowRef.current) serviceRowRef.current.classList.remove('table-light')
        }
    }, [editForm])

    const name = service.name
    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value)).replace('R$', '')

    return (
        <tr key={name} ref={serviceRowRef}>
            <td>{name}</td>
            <td>{value}</td>
            <td>
                <Pencil size={18} className='button me-3' onClick={() => {
                    setEditValuesInTheForm(name, service.value, serviceRowRef)
                }} />
                <Trash size={20} className='button' onClick={() => {
                    setTargetService(service)
                    showDeleteServiceForm()
                }} />
            </td>
        </tr>
    )

}

export default ServiceRow