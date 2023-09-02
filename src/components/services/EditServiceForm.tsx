import { useState, useEffect } from 'react'
import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import ValueInput from 'components/forms/ValueInput'
import AddFormButtons from 'components/pages/AddFormButtons'

interface EditServiceFormProps {
	setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
	serviceName: string
}

const EditServiceForm = ({ setEditServiceForm, serviceName }: EditServiceFormProps) => {

	const [blockedActions, setBlockedActions] = useState(false)
	const [value, setValue] = useState('')
	const [allInputsFilled, setAllInputsFilled] = useState(false)

	useEffect(() => {
		if (value) setAllInputsFilled(true)
	}, [value])

	const editService = () => {
		const payload = {
			service: serviceName,
			value
		}
		console.log(payload)
		setTimeout(() => {
			setEditServiceForm(false)
		}, 3000)
	}

	return (
		<Container>
			<FormHeader text='Editar Serviço' />
			<div className='card-body'>
				<h6 className='text-center'>{serviceName}</h6>
				<form onSubmit={e => {
					e.preventDefault()
					editService()
				}}>
					<ValueInput margin='my-3' setValue={setValue} />
					<AddFormButtons
						allInputsFilled={allInputsFilled}
						blockedActions={blockedActions}
						setForm={setEditServiceForm}
					/>
				</form>
			</div>
		</Container>
	)

}

export default EditServiceForm