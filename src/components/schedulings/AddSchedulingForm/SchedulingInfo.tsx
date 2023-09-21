import { sumOfServices } from 'formFunctions/scheduling/common'
import { dateFormat, moneyFormat } from 'formFunctions/common'

interface SchedulingInfoProps {
	client: string
	date: string
	servicesName: string[]
	servicesValue: number[]
}

const SchedulingInfo = ({ client, date, servicesName, servicesValue }: SchedulingInfoProps) => {

	const ServicesList = () => {
		return (
			<ul className='mt-2'>
				{servicesName.map(service => {
					return <li key={service}>{service}</li>
				})}
			</ul>
		)
	}

	const value = sumOfServices(servicesValue)

	return (
		<div className='mx-5'>
			<h6 className='mb-2'><strong>Cliente:</strong> {client}</h6>
			<h6><strong>Data:</strong> {date ? dateFormat(date) : null}</h6>
			<h6 className='my-2'><strong>Serviço:</strong> <ServicesList /></h6>
			<h6><strong>Valor:</strong> {moneyFormat(value)}</h6>
		</div>
	)
}

export default SchedulingInfo