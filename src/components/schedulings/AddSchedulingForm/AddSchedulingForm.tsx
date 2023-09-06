import { useContext, useState, useEffect } from 'react'
import { v4 } from 'uuid'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'
import { ServicesContext } from 'ServicesContext'
import { Props, ServiceScheduling } from 'types/schedulings'
import { Value } from 'types/services'
import { BooleanSet } from 'types/common'
import { CREATE_SCHEDULING } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { fetchOptions } from 'formFunctions/common'
import Container from 'components/forms/Container'
import DateInput from 'components/forms/DateInput'
import FormHeader from 'components/forms/Header'
import { Service } from 'types/services'
import ServicesOptionsInput from './ServicesOptionsInput'
import SchedulingInfo from './SchedulingInfo'

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

	const [showSecondOption, setShowSecondOption] = useState(false)
	const [servicesForSecondOption, setServicesForSecondOption] = useState(services)

	// Verificando se todos os inputs foram preenchidos
	// Pois caso não tenham sido, será impedido a mudança no comportamento do botão
	useEffect(() => {
		if (date && option && client) {
			setAllInputsFilled(true)
		}
	}, [date, option, client])

	// Filtrando as opções para a segunda opção de serviço
	useEffect(() => {
		const firstService: Service = JSON.parse(option)
		const otherServices = services.filter(service => {
			return service._id !== firstService._id
		})
		setServicesForSecondOption(otherServices)
	}, [option, services])

	const getRightValue = (schedulingDate: string, serviceValues: Value[]) => {
		const previousValues: number[] = []
		serviceValues.forEach(value => {
			if (value.date.localeCompare(schedulingDate) < 0) {
				previousValues.push(value.value)
			}
		})
		const initialValue = serviceValues[0].value
		const lastValue = previousValues[previousValues.length - 1]
		if (lastValue) {
			return lastValue
		}
		/* Retornando o valor inicial
		caso o serviço não tenha sofrido edições */
		return initialValue
	}

	const service: Service = JSON.parse(option)

	const addScheduling = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			const serviceScheduling: ServiceScheduling = {
				_id: v4(),
				service: {
					name: [service._id],
					value: [getRightValue(date, service.value)]
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

	const SecondOption = () => {
		return showSecondOption
		? <ServicesOptionsInput margin='mt-1 mb-3' setOption={setOption} services={servicesForSecondOption} />
		: <button onClick={() => setShowSecondOption(true)} 
			className='align-self-start mb-1 btn btn-sm btn-link' 
			type='button'>+1 Serviço</button>
	}

	return (
		<Container>
			<FormHeader text='Registrar Agendamento' />
			<div className='card-body d-flex'>
				<div>
					<form className='d-flex flex-column' onSubmit={e => {
						e.preventDefault()
						addScheduling()
					}}>
						<DateInput setDate={setDate} />
						<ServicesOptionsInput margin='mt-3 mb-1' setOption={setOption} services={services} />
						<SecondOption />
						<input onChange={e => setClient(e.target.value)} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
						<ConfirmFormButtons
							allInputsFilled={allInputsFilled}
							blockedActions={blockedActions}
							setForm={setAddSchedulingForm}
						/>
					</form>
				</div>
				<SchedulingInfo
					client={client}
					date={date}
					service={service}
					getRightValue={getRightValue}
				/>
			</div>
		</Container>
	)
}

export default AddSchedulingForm