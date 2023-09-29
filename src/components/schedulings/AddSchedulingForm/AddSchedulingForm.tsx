import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react'
import { v4 } from 'uuid'

import { getRightValue } from 'formFunctions/scheduling/common'

import { Scheduling } from 'types/schedulings'
import { Service } from 'types/services'

import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import DateInput from 'components/forms/DateInput'
import ServicesOptionsInput from './ServicesOptionsInput'
import SecondOption from './SecondOption'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'
import SchedulingInfo from './SchedulingInfo'

import { DocsContext } from 'DocsContext'

interface AddSchedulingFormProps {
	setAddSchedulingForm: React.Dispatch<React.SetStateAction<boolean>>
}

const AddSchedulingForm = ({ setAddSchedulingForm }: AddSchedulingFormProps) => {

	const [services] = useContext(DocsContext).services
	const [schedulings, setSchedulings] = useContext(DocsContext).schedulings
	
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

	useMemo(() => {

		let names: string[] = []
		let values: number[] = []

		const firstService: Service = JSON.parse(option)

		names.push(firstService._id)
		values.push(getRightValue(date, firstService.value))

		if (secondOption) {

			const secondService: Service = JSON.parse(secondOption)

			names.push(secondService._id)
			values.push(getRightValue(date, secondService.value))

		}

		setServicesName(names)
		setServicesValue(values)

	}, [date, option, secondOption])

	/* Verificando se todos os inputs foram preenchidos
	pois caso não tenham sido, será impedido a mudança no comportamento do botão */
	useEffect(() => {
		if (date && option && client) {
			setAllInputsFilled(true)
		}
	}, [date, option, client])

	const setFirstOptionOnSecondService = useCallback((firstOption: string) => {
		setSecondOption(firstOption)
	}, [])

	const addScheduling = () => {
		const scheduling: Scheduling = {
			_id: v4(),
			service: {
				name: servicesName,
				value: servicesValue
			},
			date,
			client: client
		}
		// Não permitindo criar dois agendamentos para a mesma pessoa no mesmo dia
		const alreadyExists = schedulings.filter(current => {
			return current.client === scheduling.client && current.date === scheduling.date
		})[0]
		if (alreadyExists) {
			alert('Já existe um agendamento para essa pessoa nessa data')
			setAddSchedulingForm(false)
		} else {
			// Organizando novos agendamentos por datas
			const newSchedulings = [...schedulings, scheduling]
				.sort((a, b) => a.date.localeCompare(b.date)).reverse()
			setSchedulings(newSchedulings)
			setAddSchedulingForm(false)
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
						<input onChange={e => setClient(e.target.value)} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
						<DateInput setDate={setDate} />
						<ServicesOptionsInput showSecondOption={showSecondOption} margin='mt-3 mb-1' setOption={setOption} services={services} />
						{
							showSecondOption
							? <SecondOption
									services={services}
									service={service}
									setShowSecondOption={setShowSecondOption}
									setSecondOption={setSecondOption}
									setFirstOptionOnSecondService={setFirstOptionOnSecondService}
									setServicesName={setServicesName}
									setServicesValue={setServicesValue}
								/>
							: <button onClick={() => {
									setShowSecondOption(true)
								}}
								className='align-self-start mb-1 btn btn-sm btn-link' 
								type='button'>
									+1 Serviço
								</button>
						}
						<ConfirmFormButtons
							allInputsFilled={allInputsFilled}
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