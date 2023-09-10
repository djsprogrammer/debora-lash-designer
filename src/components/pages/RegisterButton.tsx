import { FilePlus } from 'lucide-react'

interface RegisterButtonProps {
	setForm: React.Dispatch<React.SetStateAction<boolean>>
	text: string
}

const RegisterButton = ({ setForm, text }: RegisterButtonProps) => {

	return (
		<FilePlus onClick={() => setForm(true)} className='align-self-start button' />
	)

}

export default RegisterButton