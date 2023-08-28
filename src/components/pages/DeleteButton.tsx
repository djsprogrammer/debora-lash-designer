import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
	onClick: React.MouseEventHandler<SVGSVGElement>
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
	return (
		<Trash2 onClick={onClick} size={20} className='button' />
	)
}

export default DeleteButton