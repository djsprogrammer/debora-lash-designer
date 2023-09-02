import { useContext, useState, useEffect } from 'react'
import { v4 } from 'uuid'
import AddFormButtons from 'components/pages/AddFormButtons'
import { ServicesContext } from 'ServicesContext'
import { Props, ServiceScheduling } from 'types/schedulings'
import { BooleanSet } from 'types/common'
import { CREATE_SCHEDULING } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { fetchOptions } from 'formFunctions/common'
import Container from 'components/forms/Container'
import DateInput from 'components/forms/DateInput'
import FormHeader from 'components/forms/Header'
import { Service } from 'types/services'

interface AddSchedulingFormProps extends Props {
	setAddSchedulingForm: BooleanSet
}

const AddSchedulingForm = ({ schedulingsState, setAddSchedulingForm }: AddSchedulingFormProps) => {

	const [services] = useContext(ServicesContext)

	const [servicesScheduling, setServicesScheduling] = schedulingsState
	const [blockedActions, setBlockedActions] = useState(false)
	const [date, setDate] = useState('')
	// Começando o state com a primeira opção caso o usuário não mude
	const [option, setOption] = useState(JSON.stringify(services[0]))
	const [client, setClient] = useState('')
	const [allInputsFilled, setAllInputsFilled] = useState(false)

	// Verificando se todos os inputs foram preenchidos
	// Pois caso não tenham sido, será impedido a mudança no comportamento do botão
	useEffect(() => {
		if (date && option && client) {
			setAllInputsFilled(true)
		}
	}, [date, option, client])

	const addScheduling = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			const service: Service = JSON.parse(option)
			const serviceScheduling: ServiceScheduling = {
				_id: v4(),
				service: {
					_id: service._id,
					value: service.value[0].value
				},
				date,
				client: client
			}
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
				fetch(CREATE_SCHEDULING, payload)
					.then(res => {
						switch (res.status) {
							case 201:
								// Organizando novos agendamentos por datas
								const newSchedulings = [...servicesScheduling, serviceScheduling]
									.sort((a, b) => a.date.localeCompare(b.date)).reverse()
								setServicesScheduling(newSchedulings)
								break
							case 503:
								alert(DATABASE_ERROR_TEXT)
								break
						}
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

	return (
		<Container>
			<FormHeader page='Agendamento' />
			<div className='card-body'>
				<form className='d-flex flex-column' onSubmit={e => {
					e.preventDefault()
					addScheduling()
				}}>
					<DateInput setDate={setDate} />
					<div className='input-group my-3'>
						<label className='input-group-text'>Escolha um serviço</label>
						<select onChange={e => setOption(e.target.value)} className='form-select text-center' required>
							{services.map(service => (
								<option key={service._id} value={JSON.stringify(service)}>{service._id}</option>
							))}
						</select>
					</div>
					<input onChange={e => setClient(e.target.value)} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
					<AddFormButtons
						allInputsFilled={allInputsFilled}
						blockedActions={blockedActions}
						setAddForm={setAddSchedulingForm}
					/>
				</form>
			</div>
		</Container>
	)
}

export default AddSchedulingForm