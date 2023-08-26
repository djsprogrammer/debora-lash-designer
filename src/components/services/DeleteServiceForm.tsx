import { confirmButtonStyle, deleteFormStyle, deleteFormCardStyle, deleteButtonStyle } from 'commonStyles'
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
			<div className={deleteFormCardStyle}>
				<p>Tem certeza que deseja excluir este serviço?</p>
				<div className='text-center'>
					<button ref={deleteButton} onClick={() => deleteService(deleteButton)} className={confirmButtonStyle}>Excluir</button>
					<button onClick={() => {
						if(possibleToCancel) cancelDelete()
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteServiceForm