import { confirmButtonStyle, deleteButtonStyle } from 'commonStyles'
import { useRef } from 'react'
import { ButtonRef } from 'types/common'

interface Props {
	setDeleteForm: React.Dispatch<React.SetStateAction<boolean>>
	deleteTarget: (buttonRef: ButtonRef) => void
	possibleToCancel: boolean
}

const DeleteSchedulingForm = ({ deleteTarget, setDeleteForm, possibleToCancel }: Props) => {

	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center delete-form'>
			<div className='card'>
				<p className='card-header'>Tem certeza que deseja excluir?</p>
				<div className='card-body text-center'>
					<button ref={deleteButtonRef} onClick={() => deleteTarget(deleteButtonRef)} className={confirmButtonStyle}>Excluir</button>
					<button onClick={() => {
						if(possibleToCancel) setDeleteForm(false)
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteSchedulingForm