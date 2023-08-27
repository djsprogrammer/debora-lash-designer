import { useContext, useRef, useEffect, useState } from 'react'
import { ServicesContext } from 'ServicesContext'
import { Props } from 'types/schedulings'
import { BooleanSet } from 'types/common'
import { addFormContainer, addFormCardStyle, deleteButtonStyle } from 'commonStyles'
import { SERVER_URL } from 'App'
import { SERVER_ERROR_TEXT } from 'errorAdvices'
import { fetchOptions } from 'formFunctions/common'
import { saveRefsInMemory, createSchedulingToSend, responseHandler, resetForm } from 'formFunctions/AddSchedulingForm'

interface AddSchedulingFormProps extends Props {
	setAddSchedulingForm: BooleanSet
}

const AddSchedulingForm = ({ schedulingsState, setAddSchedulingForm }: AddSchedulingFormProps) => {

	const [services] = useContext(ServicesContext)

	const [servicesScheduling, setServicesScheduling] = schedulingsState
	const [blockedActions, setBlockedActions] = useState(false)

	const date = useRef<HTMLInputElement>(null)
	const options = useRef<HTMLSelectElement>(null)
	const client = useRef<HTMLInputElement>(null)
	const addButton = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		saveRefsInMemory(options, date, client, addButton)
	}, [])

	const addScheduling = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			if (addButton.current) addButton.current.innerText = '...'
			const serviceScheduling = createSchedulingToSend()
			if (serviceScheduling) {
				// Não permitindo criar dois agendamentos para a mesma pessoa no mesmo dia
				const alreadyExists = servicesScheduling.filter(scheduling => {
					return scheduling.client === serviceScheduling.client && scheduling.date === serviceScheduling.date
				})[0]
				if (alreadyExists) {
					alert('Já existe um agendamento para essa pessoa nessa data')
					resetForm()
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
							resetForm()
							setBlockedActions(false)
							setAddSchedulingForm(false)
						})
						.catch(() => {
							alert(SERVER_ERROR_TEXT)
							resetForm()
							setBlockedActions(false)
							setAddSchedulingForm(false)	
						})
				}
			}
		}
	}

	return (
		<div className={addFormContainer}>
			<div className={addFormCardStyle}>
				<form className='d-flex flex-column' onSubmit={e => {
					e.preventDefault()
					addScheduling()
				}}>
					<div className='input-group'>
						<label className='input-group-text'>Escolha uma data</label>
						<input ref={date} className='pe-1 form-control text-center' type='date' required />
					</div>
					<div className='input-group my-3'>
						<label className='input-group-text'>Escolha um serviço</label>
						<select ref={options} className='form-select text-center' required>
							{services.map(service => (
								<option key={service.name} value={JSON.stringify(service)}>{service.name}</option>
							))}
						</select>
					</div>
					<input ref={client} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
					<div className='text-center'>
						<button ref={addButton} className='btn btn-sm btn-dark me-2' type='submit'>Agendar</button>
						<button onClick={() => {
							// Só permitindo fechar o formulário quando não estiver ocorrendo alguma ação
							if (!blockedActions) setAddSchedulingForm(false)
						}} className={deleteButtonStyle}>Cancelar</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddSchedulingForm