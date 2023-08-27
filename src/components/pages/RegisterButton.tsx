import { BooleanSet } from 'types/common'

interface Props {
	setForm: BooleanSet
}

const RegisterButton = ({ setForm }: Props) => {

	return (
		<button onClick={() => setForm(true)} className='btn btn-sm btn-outline-dark align-self-start'>Registrar</button>
	)

}

export default RegisterButton