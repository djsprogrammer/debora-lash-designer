import { useState, useEffect } from 'react'
import { Pencil, Trash } from 'lucide-react'
import { Service, SetService } from 'types/services'

interface Props {
    editForm: boolean
    service: Service
    setTargetService: SetService
    showDeleteServiceForm: () => void
    setEditValuesInTheForm: (tdName: string, value: number) => void
}

const ServiceRow = ({ editForm, service, setTargetService, showDeleteServiceForm, setEditValuesInTheForm }: Props) => {

    const [toEdit, setToEdit] = useState('')

    useEffect(() => {
        if (!editForm) {
            setToEdit('')
        }
    }, [editForm])

    const name = service.name
    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value)).replace('R$', '')

    return (
        <tr key={name} className={toEdit}>
            <td>{name}</td>
            <td>{value}</td>
            <td>
                <Pencil size={20} className='button me-3' onClick={() => {
                    setToEdit('table-secondary')
                    setEditValuesInTheForm(name, service.value)
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