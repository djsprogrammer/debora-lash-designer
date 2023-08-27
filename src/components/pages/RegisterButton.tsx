import { BooleanSet } from 'types/common'

interface Props {
	setForm: BooleanSet
	text: string
}

const RegisterButton = ({ setForm, text }: Props) => {

	return (
		<button onClick={() => setForm(true)} className='btn btn-sm btn-outline-dark align-self-start'>{text}</button>
	)

}

export default RegisterButton