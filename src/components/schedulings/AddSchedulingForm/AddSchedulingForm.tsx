import { useContext, useState, useEffect, useCallback } from 'react'
import { v4 } from 'uuid'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'
import { ServicesContext } from 'ServicesContext'
import { Props, ServiceScheduling } from 'types/schedulings'
import { BooleanSet } from 'types/common'
import { CREATE_SCHEDULING } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { fetchOptions } from 'formFunctions/common'
import { getRightValue } from 'formFunctions/scheduling/common'
import Container from 'components/forms/Container'
import DateInput from 'components/forms/DateInput'
import FormHeader from 'components/forms/Header'
import { Service } from 'types/services'
import ServicesOptionsInput from './ServicesOptionsInput'
import SchedulingInfo from './SchedulingInfo'
import SecondOption from './SecondOption'

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
	const [secondOption, setSecondOption] = useState('')

	const service: Service = JSON.parse(option)

	const [servicesName, setServicesName] = useState<string[]>([])
	const [servicesValue, setServicesValue] = useState<number[]>([])

	const [client, setClient] = useState('')
	const [allInputsFilled, setAllInputsFilled] = useState(false)

	const [showSecondOption, setShowSecondOption] = useState(false)

	// Verificando se todos os inputs foram preenchidos
	// Pois caso não tenham sido, será impedido a mudança no comportamento do botão
	useEffect(() => {
		if (date && option && client) {
			setAllInputsFilled(true)
		}
	}, [date, option, client])

	useEffect(() => {

		const firstService: Service = JSON.parse(option)

		setServicesName([firstService._id])
		setServicesValue([getRightValue(date, firstService.value)])

	}, [option, date])

	const setFirstOptionOnSecondService = useCallback((firstOption: string) => {
		setSecondOption(firstOption)
	}, [])

	const addScheduling = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			const serviceScheduling: ServiceScheduling = {
				_id: v4(),
				service: {
					name: servicesName,
					value: servicesValue
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
			<FormHeader text='Registrar Agendamento' />
			<div className='card-body d-flex'>
				<div>
					<form className='d-flex flex-column' onSubmit={e => {
						e.preventDefault()
						addScheduling()
					}}>
						<DateInput setDate={setDate} />
						<ServicesOptionsInput margin='mt-3 mb-1' setOption={setOption} services={services} />
						{
							showSecondOption
							? <SecondOption
									services={services}
									service={service}
									setShowSecondOption={setShowSecondOption}
									setSecondOption={setSecondOption}
									setFirstOptionOnSecondService={setFirstOptionOnSecondService}
								/>
							: <button onClick={() => {
									setShowSecondOption(true)
								}}
								className='align-self-start mb-1 btn btn-sm btn-link' 
								type='button'>
									+1 Serviço
								</button>
						}
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
					servicesName={servicesName}
					servicesValue={servicesValue}
				/>
			</div>
		</Container>
	)
}

export default AddSchedulingForm