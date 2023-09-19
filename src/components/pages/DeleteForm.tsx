import { useRef, useState } from 'react'

import { formContainer, confirmButtonStyle, cancelButtonStyle } from 'commonStyles'

interface DeleteFormProps {
	setDeleteForm: React.Dispatch<React.SetStateAction<boolean>>
	deleteTarget: () => void
}

const DeleteForm = ({ deleteTarget, setDeleteForm }: DeleteFormProps) => {

	const [possibleToCancel, setPossibleToCancel] = useState(true)

	const deleteButtonRef = useRef<HTMLButtonElement>(null)

	const prepareToDelete = () => {
		// Indicando ao usuário que a operação começou
		if (deleteButtonRef.current) deleteButtonRef.current.innerText = '...'
		// Impossibilitando o cancelamento da operação
		setPossibleToCancel(false)
		deleteTarget()
	}

	return (
		<div style={{ zIndex: 1 }} className={formContainer}>
			<div className='card border-light shadow form-bg'>
				<p className='card-header'>Tem certeza que deseja excluir?</p>
				<div className='card-body text-center'>
					<button ref={deleteButtonRef} onClick={() => prepareToDelete()} className={`${confirmButtonStyle} me-2`}>Excluir</button>
					<button onClick={() => {
						if (possibleToCancel) setDeleteForm(false)
					}} className={cancelButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteForm