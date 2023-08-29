import { useContext, useRef, useEffect, useState } from 'react'
import AddFormButtons from 'components/pages/AddFormButtons'
import { ServicesContext } from 'ServicesContext'
import { Props } from 'types/schedulings'
import { BooleanSet } from 'types/common'
import { formContainer, addFormCardStyle, addFormCardHeaderStyle } from 'commonStyles'
import { SERVER_URL } from 'App'
import { SERVER_ERROR_TEXT } from 'errorAdvices'
import { fetchOptions } from 'formFunctions/common'
import { saveRefsInMemory, createSchedulingToSend, responseHandler } from 'formFunctions/AddSchedulingForm'
import DateInput from 'components/forms/DateInput'

interface AddSchedulingFormProps extends Props {
	setAddSchedulingForm: BooleanSet
}

const AddSchedulingForm = ({ schedulingsState, setAddSchedulingForm }: AddSchedulingFormProps) => {

	const [services] = useContext(ServicesContext)

	const [servicesScheduling, setServicesScheduling] = schedulingsState
	const [blockedActions, setBlockedActions] = useState(false)
	const [date, setDate] = useState('')

	const options = useRef<HTMLSelectElement>(null)
	const client = useRef<HTMLInputElement>(null)

	useEffect(() => {
		saveRefsInMemory(options, client)
	}, [])

	const addScheduling = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			const serviceScheduling = createSchedulingToSend(date)
			if (serviceScheduling) {
				// Não permitindo criar dois agendamentos para a mesma pessoa no mesmo dia
				const alreadyExists = servicesScheduling.filter(scheduling => {
					return scheduling.client === serviceScheduling.client && scheduling.date === serviceScheduling.date
				})[0]
				if (alreadyExists) {
					alert('Já existe um agendamento para essa pessoa nessa data')
					setBlockedActions(false)
					setAddSchedulingForm(false)
				} else {
					const payload = fetchOptions('post', serviceScheduling)
					fetch(`${SERVER_URL}/create-scheduling`, payload)
						.then(res => {
							// Organizando novos agendamentos por datas
							const newSchedulings = [...servicesScheduling, serviceScheduling]
								.sort((a, b) => a.date.localeCompare(b.date)).reverse()
							responseHandler(res, setServicesScheduling, newSchedulings)
							setBlockedActions(false)
							setAddSchedulingForm(false)
						})
						.catch(() => {
							alert(SERVER_ERROR_TEXT)
							setBlockedActions(false)
							setAddSchedulingForm(false)	
						})
				}
			}
		}
	}

	return (
		<div className={formContainer}>
			<div className={addFormCardStyle}>
				<div className={addFormCardHeaderStyle}>
					<h5>Registrar Agendamento</h5>
				</div>
				<div className='card-body'>
					<form className='d-flex flex-column' onSubmit={e => {
						e.preventDefault()
						addScheduling()
					}}>
						<DateInput setDate={setDate} />
						<div className='input-group my-3'>
							<label className='input-group-text'>Escolha um serviço</label>
							<select ref={options} className='form-select text-center' required>
								{services.map(service => (
									<option key={service._id} value={JSON.stringify(service)}>{service._id}</option>
								))}
							</select>
						</div>
						<input ref={client} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
						<AddFormButtons
							blockedActions={blockedActions}
							setAddForm={setAddSchedulingForm}
						/>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddSchedulingForm