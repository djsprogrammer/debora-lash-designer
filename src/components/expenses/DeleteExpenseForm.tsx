import { deleteButtonStyle } from 'commonStyles'
import { useRef } from 'react'
import { BooleanSet, ButtonRef } from 'types/common'

interface Props {
	setDeleteExpenseForm: BooleanSet
	deleteExpense: (buttonRef: ButtonRef) => void
	possibleToCancel: boolean
}

const DeleteExpenseForm = ({ deleteExpense, setDeleteExpenseForm, possibleToCancel }: Props) => {

	const deleteButton = useRef<HTMLButtonElement>(null)

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center'>
			<div className='card p-5'>
				<p>Tem certeza que deseja excluir esta despesa?</p>
				<div className='text-center'>
					<button ref={deleteButton} onClick={() => deleteExpense(deleteButton)} className='btn btn-sm btn-outline-dark me-2'>Excluir</button>
					<button onClick={() => {
						if(possibleToCancel) setDeleteExpenseForm(false)
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteExpenseForm