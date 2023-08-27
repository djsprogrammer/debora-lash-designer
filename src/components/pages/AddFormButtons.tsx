import { useRef } from 'react'
import { BooleanSet } from 'types/common'
import { deleteButtonStyle } from 'commonStyles'

interface Props {
	confirmText: string
	blockedActions: boolean
	setAddForm: BooleanSet
}

const AddFormButtons = ({ confirmText, blockedActions, setAddForm }: Props) => {

	const confirmButtonRef = useRef<HTMLButtonElement>(null)

	return (
		<div className='text-center'>
			<button ref={confirmButtonRef} onClick={() => {
				if (confirmButtonRef.current) confirmButtonRef.current.innerText = '...'
			}} className='btn btn-sm btn-dark me-2' type='submit'>{confirmText}</button>
			<button onClick={() => {
				// Só permitindo fechar o formulário quando não estiver ocorrendo alguma ação
				if (!blockedActions) setAddForm(false)
			}} className={deleteButtonStyle}>Cancelar</button>
		</div>
	)

}

export default AddFormButtons