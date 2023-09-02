import { useState, useEffect } from 'react'
import { Service } from 'types/services'
import { INVALID_NUMBER_TEXT } from 'constants/errors'
import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import ValueInput from 'components/forms/ValueInput'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'
import { validNumber, getCurrentDate } from 'formFunctions/common'

interface EditServiceFormProps {
	serviceForEdition: Service
	setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EditServiceForm = ({ serviceForEdition, setEditServiceForm }: EditServiceFormProps) => {

	const [blockedActions, setBlockedActions] = useState(false)
	const [value, setValue] = useState('')
	const [allInputsFilled, setAllInputsFilled] = useState(false)

	useEffect(() => {
		if (value) setAllInputsFilled(true)
	}, [value])

	const editService = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			if (validNumber(value)) {
		        const newValue = {
		        	value: Number(value),
		        	date: getCurrentDate()
		        }
				serviceForEdition.value.push(newValue)
				setEditServiceForm(false)
			} else {
				alert(INVALID_NUMBER_TEXT)
				setEditServiceForm(false)
			}
		}
	}

	return (
		<Container>
			<FormHeader text='Editar Serviço' />
			<div className='card-body'>
				<h6 className='text-center'>{serviceForEdition._id}</h6>
				<form onSubmit={e => {
					e.preventDefault()
					editService()
				}}>
					<ValueInput margin='my-3' setValue={setValue} />
					<ConfirmFormButtons
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