import { useRef } from 'react'
import { Button } from 'types/services'

interface Props {
	setDeleteSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
	deleteScheduling: (button: Button) => void
}

const DeleteSchedulingForm = ({ deleteScheduling, setDeleteSchedulingForm }: Props) => {

	const deleteButton = useRef<HTMLButtonElement>(null)

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center'>
			<div className='card p-5'>
				<p>Tem certeza que deseja excluir este agendamento?</p>
				<div className='text-center'>
					<button ref={deleteButton} onClick={() => deleteScheduling(deleteButton)} className='btn btn-sm btn-outline-dark me-2'>Excluir</button>
					<button onClick={() => setDeleteSchedulingForm(false)} className='btn btn-sm btn-outline-danger'>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteSchedulingForm