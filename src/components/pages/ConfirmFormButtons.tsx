import { useRef } from 'react'

import { confirmButtonStyle, cancelButtonStyle } from 'commonStyles'

import { BooleanSet } from 'types/common'

interface ConfirmFormButtonsProps {
	allInputsFilled: boolean
	blockedActions: boolean
	setForm: BooleanSet
}

const ConfirmFormButtons = ({ allInputsFilled, blockedActions, setForm }: ConfirmFormButtonsProps) => {

	const confirmButtonRef = useRef<HTMLButtonElement>(null)
	const cancelButtonRef = useRef<HTMLButtonElement>(null)

	return (
		<div className='d-flex flex-column mt-1'>

			<button ref={confirmButtonRef} onClick={() => {
				if (confirmButtonRef.current && cancelButtonRef.current) {
					if (allInputsFilled) {
						// Indicando que a operação foi realizada
						confirmButtonRef.current.innerText = '...'
						cancelButtonRef.current.style.display = 'none'
					}
				}
			}} className={`${confirmButtonStyle} mb-2`} type='submit'>Registrar</button>

			<button ref={cancelButtonRef} onClick={() => {
				// Só permitindo fechar o formulário quando não estiver ocorrendo alguma ação
				if (!blockedActions) setForm(false)
			}} className={cancelButtonStyle}>Cancelar</button>

		</div>
	)

}

export default ConfirmFormButtons