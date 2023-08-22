import { useContext, useRef, useEffect } from 'react'
import { ServicesContext } from 'ServicesContext'
import { ServiceScheduling } from 'types/schedulings'
import { formButtonStyle } from 'commonStyles'
import { SERVER_URL } from 'App'
import { SERVER_ERROR_TEXT } from 'errorAdvices'
import { fetchOptions } from 'formFunctions/GenericForm'
import { saveRefsInMemory, createSchedulingToSend, responseHandler, resetForm } from 'formFunctions/AddSchedulingForm'

interface Props {
	schedulingsState: [ServiceScheduling[], React.Dispatch<React.SetStateAction<ServiceScheduling[]>>]
}

const AddSchedulingForm = ({ schedulingsState }: Props) => {

	const [services] = useContext(ServicesContext)

	const [servicesScheduling, setServicesScheduling] = schedulingsState

	const date = useRef<HTMLInputElement>(null)
	const options = useRef<HTMLSelectElement>(null)
	const client = useRef<HTMLInputElement>(null)
	const addButton = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		saveRefsInMemory(options, date, client, addButton)
	}, [])

	const addScheduling = () => {
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
			} else {
				const payload = fetchOptions('post', serviceScheduling)
				fetch(`${SERVER_URL}/create-scheduling`, payload)
					.then(res => {
						// Organizando novos agendamentos por datas
						const newSchedulings = [...servicesScheduling, serviceScheduling]
							.sort((a, b) => a.date.localeCompare(b.date)).reverse()
						responseHandler(res, setServicesScheduling, newSchedulings)
						resetForm()
					})
					.catch(() => {
						alert(SERVER_ERROR_TEXT)
						resetForm()			
					})
			}
		}
	}

	return (
		<form className='d-flex flex-column' onSubmit={e => {
			e.preventDefault()
			addScheduling()
		}}>
			<div className='input-group'>
				<label className='input-group-text'>Escolha uma data</label>
				<input className='pe-1 form-control text-center' ref={date} type='date' required />
			</div>
			<div className='input-group my-3'>
				<label className='input-group-text'>Escolha um serviço</label>
				<select className='form-select text-center' ref={options} required>
					{services.map(service => (
						<option key={service.name} value={JSON.stringify(service)}>{service.name}</option>
					))}
				</select>
			</div>
			<input ref={client} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
			<button ref={addButton} className={formButtonStyle} type='submit'>Agendar</button>
		</form>
	)
}

export default AddSchedulingForm