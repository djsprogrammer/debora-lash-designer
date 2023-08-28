import { FilePlus } from 'lucide-react'
import { BooleanSet } from 'types/common'

interface Props {
	setForm: BooleanSet
	text: string
}

const RegisterButton = ({ setForm, text }: Props) => {

	return (
		<FilePlus onClick={() => setForm(true)} className='align-self-start button' />
	)

}

export default RegisterButton