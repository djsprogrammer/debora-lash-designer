import { useRef } from 'react'
import { BooleanSet } from 'types/common'
import { confirmButtonStyle, cancelButtonStyle } from 'commonStyles'

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
			}} className={confirmButtonStyle} type='submit'>{confirmText}</button>
			<button onClick={() => {
				// Só permitindo fechar o formulário quando não estiver ocorrendo alguma ação
				if (!blockedActions) setAddForm(false)
			}} className={cancelButtonStyle}>Cancelar</button>
		</div>
	)

}

export default AddFormButtons