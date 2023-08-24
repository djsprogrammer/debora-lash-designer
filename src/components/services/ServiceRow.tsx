import { useEffect, useRef } from 'react'
import { ButtonRef } from 'types/common'
import { Service, SetService } from 'types/services'

interface Props {
    editForm: boolean
    service: Service
    setTargetService: SetService
    showDeleteServiceForm: () => void
    setEditValuesInTheForm: (tdName: string, value: number, editButtonRef: ButtonRef) => void
}

const ServiceRow = ({ editForm, service, setTargetService, showDeleteServiceForm, setEditValuesInTheForm }: Props) => {

    useEffect(() => {
        if (!editForm) {
            if (editButtonRef.current) {
                // Voltando o estilo de todos os botôes ao padrão depois de realizada a edição
                editButtonRef.current.classList.remove('btn-dark')
                editButtonRef.current.classList.add('btn-outline-dark')
            }
        }
    }, [editForm])

    const editButtonRef = useRef<HTMLButtonElement>(null)
    const deleteButton = useRef<HTMLButtonElement>(null)

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(service.value)).replace('R$', '')

    const buttonStyle = 'btn btn-sm'

    return (
        <tr key={service.name}>
            <td>{service.name}</td>
            <td>{value}</td>
            <td>
                <button ref={editButtonRef} onClick={() => setEditValuesInTheForm(service.name, service.value, editButtonRef)} className={`${buttonStyle} btn-outline-dark me-2`}>Editar Valor</button>
                <button ref={deleteButton} onClick={() => {
                    setTargetService(service)
                    showDeleteServiceForm()
                }} className={`${buttonStyle} btn-outline-danger`}>Excluir</button>
            </td>
        </tr>
    )

}

export default ServiceRow