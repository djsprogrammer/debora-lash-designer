import { confirmButtonStyle, deleteFormStyle, deleteFormCardStyle, deleteButtonStyle } from 'commonStyles'
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
		<div style={{ zIndex: 1 }} className={deleteFormStyle}>
			<div className={deleteFormCardStyle}>
				<p className='card-header text-bg-dark'>Tem certeza que deseja excluir esta despesa?</p>
				<div className='card-body text-center'>
					<button ref={deleteButton} onClick={() => deleteExpense(deleteButton)} className={confirmButtonStyle}>Excluir</button>
					<button onClick={() => {
						if(possibleToCancel) setDeleteExpenseForm(false)
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteExpenseForm