import { useContext, useRef } from 'react'
import { ServicesContext } from '../../../ServicesContext'
import { Service } from '../../../types/services'

interface ServiceScheduling {
	service: Service
	date: string
	client: string
}

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

	return (
		<form className='d-flex flex-column align-items-center' onSubmit={e => {
					e.preventDefault()
					printScheduling()
				}}>
			<div>
				<label className='me-2'>Escolha uma data: </label>
				<input className='p-1' ref={date} type='date' required />
			</div>
			<div className='my-3'>
				<label className='me-2' htmlFor='services'>Escolha um serviço: </label>
				<select ref={options} required>
					{services.map(service => (
						<option value={JSON.stringify(service)}>{service.name}</option>
					))}
				</select>
			</div>
			<input ref={clientElement} className='text-center rounded-pill border border-secondary p-1 mb-3' type='text' placeholder='Digite o nome do cliente' required />
			<button className='btn btn-dark rounded-pill' type='submit'>Agendar</button>
		</form>
	)
}

export default Index