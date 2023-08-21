import { useRef } from 'react'
import { Button } from '../../../../types/services'

interface Props {
	setDeleteServiceForm: React.Dispatch<React.SetStateAction<boolean>>
	deleteService: (button: Button) => void
}

const DeleteServiceForm = ({ deleteService, setDeleteServiceForm }: Props) => {

	const deleteButton = useRef<HTMLButtonElement>(null)

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center'>
			<div className='card p-5'>
				<p>Tem certeza que deseja excluir este serviço?</p>
				<div className='text-center'>
					<button ref={deleteButton} onClick={() => deleteService(deleteButton)} className='btn btn-sm btn-outline-dark me-2'>Excluir</button>
					<button onClick={() => setDeleteServiceForm(false)} className='btn btn-sm btn-outline-danger'>Cancelar</button>
				</div>
			</div>
		</div>
	)

}

export default DeleteServiceForm