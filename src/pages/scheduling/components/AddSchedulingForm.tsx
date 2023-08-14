import { useContext, useRef } from 'react'
import { ServicesContext } from '../../../ServicesContext'
import { ServiceScheduling } from '../../../types/services'
import { formButtonStyle, formWidth } from '../../../commonStyles'

interface Props {
	servicesScheduling: ServiceScheduling[]
	setServicesScheduling: React.Dispatch<React.SetStateAction<ServiceScheduling[]>>
}

const Index = ({ servicesScheduling, setServicesScheduling }: Props) => {

	const [services] = useContext(ServicesContext)

	const date = useRef<HTMLInputElement>(null)
	const options = useRef<HTMLSelectElement>(null)
	const clientElement = useRef<HTMLInputElement>(null)

	const addScheduling = () => {
		if (date.current && options.current && clientElement.current) {
			let formattedDate = date.current.value
			const option = JSON.parse(options.current.value)
			const client = clientElement.current.value
			const serviceScheduling: ServiceScheduling = {
				service: option,
				date: formattedDate,
				currentMonth: new Date().getMonth(),
				client,
				confirmed: false
			}
			const newSchedulings = [...servicesScheduling, serviceScheduling]
				.sort((a, b) => a.date.localeCompare(b.date)) // Organizando por datas
			setServicesScheduling(newSchedulings)
		}
	}

	return (
		<form style={formWidth} className='d-flex flex-column' onSubmit={e => {
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
						<option value={JSON.stringify(service)}>{service.name}</option>
					))}
				</select>
			</div>
			<input ref={clientElement} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
			<button className={formButtonStyle} type='submit'>Agendar</button>
		</form>
	)
}

export default Index