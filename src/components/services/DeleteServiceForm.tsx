import { deleteFormStyle, deleteButtonStyle } from 'commonStyles'
import { useRef } from 'react'
import { ButtonRef } from 'types/common'

interface Props {
	deleteService: (buttonRef: ButtonRef) => void
	possibleToCancel: boolean
	cancelDelete: () => void
}

const DeleteServiceForm = ({ deleteService, possibleToCancel, cancelDelete }: Props) => {

	const deleteButton = useRef<HTMLButtonElement>(null)

	return (
		<div style={{ zIndex: 1 }} className={deleteFormStyle}>
			<div className='card p-5'>
				<p>Tem certeza que deseja excluir este serviço?</p>
				<div className='text-center'>
					<button ref={deleteButton} onClick={() => deleteService(deleteButton)} className='btn btn-sm btn-dark me-2'>Excluir</button>
					<button onClick={() => {
						if(possibleToCancel) cancelDelete()
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteServiceForm