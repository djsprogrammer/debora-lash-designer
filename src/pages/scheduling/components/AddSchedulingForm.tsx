import { useContext, useRef } from 'react'
import { ServicesContext } from '../../../ServicesContext'
import { ServiceScheduling } from '../../../types/services'

interface Props {
	setServicesScheduling: React.Dispatch<React.SetStateAction<ServiceScheduling[]>>
}

const Index = ({ setServicesScheduling }: Props) => {

	const [services] = useContext(ServicesContext)

	const date = useRef<HTMLInputElement>(null)
	const options = useRef<HTMLSelectElement>(null)
	const clientElement = useRef<HTMLInputElement>(null)

	const printScheduling = () => {
		if (date.current && options.current && clientElement.current) {
			let formattedDate = date.current.value // new Date(date.current.value)
			// formattedDate.setDate(formattedDate.getDate() + 1)
			const option = JSON.parse(options.current.value)
			const client = clientElement.current.value
			const serviceScheduling = {
				service: option,
				date: formattedDate,
				client
			}
			setServicesScheduling(prev => [...prev, serviceScheduling])
		}
	}

	const width = {
		maxWidth: '80%'
	}

	const formWidth = {
		maxWidth: '400px'
	}

	return (
		<form style={formWidth} className='d-flex flex-column' onSubmit={e => {
					e.preventDefault()
					printScheduling()
				}}>
			<div style={width} className='input-group'>
				<label className='input-group-text'>Escolha uma data </label>
				<input className='pe-1 form-control text-center' ref={date} type='date' required />
			</div>
			<div className='input-group my-3'>
				<label className='input-group-text' htmlFor='services'>Escolha um serviço </label>
				<select className='form-select text-center' ref={options} required>
					{services.map(service => (
						<option value={JSON.stringify(service)}>{service.name}</option>
					))}
				</select>
			</div>
			<input ref={clientElement} className='form-control text-center p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
			<button className='align-self-center btn btn-dark rounded-pill' type='submit'>Agendar</button>
		</form>
	)
}

export default Index