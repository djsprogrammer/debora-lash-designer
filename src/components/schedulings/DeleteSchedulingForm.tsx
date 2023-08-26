import { confirmButtonStyle, deleteFormStyle, deleteFormCardStyle, deleteButtonStyle } from 'commonStyles'
import { useRef } from 'react'
import { ButtonRef } from 'types/common'

interface Props {
	setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
	deleteScheduling: (buttonRef: ButtonRef) => void
	possibleToCancel: boolean
}

const DeleteSchedulingForm = ({ deleteScheduling, setDeleteSchedulingForm, possibleToCancel }: Props) => {

	const deleteButton = useRef<HTMLButtonElement>(null)

	return (
		<div style={{ zIndex: 1 }} className={deleteFormStyle}>
			<div className={deleteFormCardStyle}>
				<p>Tem certeza que deseja excluir este agendamento?</p>
				<div className='text-center'>
					<button ref={deleteButton} onClick={() => deleteScheduling(deleteButton)} className={confirmButtonStyle}>Excluir</button>
					<button onClick={() => {
						if(possibleToCancel) setDeleteSchedulingForm(false)
					}} className={deleteButtonStyle}>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteSchedulingForm