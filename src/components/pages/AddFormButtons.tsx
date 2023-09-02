import { useRef } from 'react'
import { BooleanSet } from 'types/common'
import { confirmButtonStyle, cancelButtonStyle } from 'commonStyles'

interface Props {
	allInputsFilled: boolean
	blockedActions: boolean
	setForm: BooleanSet
}

const AddFormButtons = ({ allInputsFilled, blockedActions, setForm }: Props) => {

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

export default AddFormButtons