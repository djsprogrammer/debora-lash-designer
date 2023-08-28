import { confirmButtonStyle, deleteButtonStyle } from 'commonStyles'
import { useRef } from 'react'

interface Props {
	setDeleteForm: React.Dispatch<React.SetStateAction<boolean>>
	deleteTarget: () => void
	possibleToCancel: boolean
}

const DeleteSchedulingForm = ({ deleteTarget, setDeleteForm, possibleToCancel }: Props) => {

	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const prepareToDelete = () => {
		// Indicando ao usuário que a operação começou
		if (deleteButtonRef.current) deleteButtonRef.current.innerText = '...'
		deleteTarget()
	}

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center delete-form'>
			<div className='card'>
				<p className='card-header'>Tem certeza que deseja excluir?</p>
				<div className='card-body text-center'>
					<button ref={deleteButtonRef} onClick={() => prepareToDelete()} className={confirmButtonStyle}>Excluir</button>
					<button onClick={() => {
						if (possibleToCancel) setDeleteForm(false)
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteSchedulingForm