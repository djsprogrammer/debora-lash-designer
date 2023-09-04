import { useState, useEffect } from 'react'
import { Service, ServicesState, Value } from 'types/services'
import { EDIT_SERVICE } from 'constants/urls'
import { INVALID_NUMBER_TEXT, DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import ValueInput from 'components/forms/ValueInput'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'
import { validNumber, orderServices } from 'formFunctions/common'
import { generateNewValue } from 'formFunctions/service/common'
import { checkForValueInTheSameDate } from 'formFunctions/service/editService'

interface EditServiceFormProps {
	servicesState: ServicesState
	serviceForEdition: Service
	setEditServiceForm: React.Dispatch<React.SetStateAction<boolean>>
}

const EditServiceForm = ({ servicesState, serviceForEdition, setEditServiceForm }: EditServiceFormProps) => {

	const [services, setServices] = servicesState
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
		        const newValue: Value = generateNewValue(value)
		        checkForValueInTheSameDate(serviceForEdition, newValue)
				const options = {
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(serviceForEdition)
				}
				fetch(EDIT_SERVICE, options)
					.then(res => {
						switch (res.status) {
							case 204:
								const otherServices = services.filter(service => {
									return service._id !== serviceForEdition._id
								})
								setServices(orderServices([...otherServices, serviceForEdition]))
								break
							case 503:
								alert(DATABASE_ERROR_TEXT)
						}
						setEditServiceForm(false)
					})
					.catch(() => {
						alert(SERVER_ERROR_TEXT)
						setEditServiceForm(false)
					})
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