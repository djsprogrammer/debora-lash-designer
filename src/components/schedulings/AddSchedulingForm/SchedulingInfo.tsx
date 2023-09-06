import { dateFormat } from 'formFunctions/common'
import { getRightValue } from 'formFunctions/scheduling/common'
import { Service } from 'types/services'

interface SchedulingInfoProps {
	client: string
	date: string
	service: Service
}

const SchedulingInfo = ({ client, date, service }: SchedulingInfoProps) => {
	return (
		<div className='mx-5'>
			<h6 className='mb-2'><strong>Cliente:</strong> {client}</h6>
			<h6><strong>Data:</strong> {date ? dateFormat(date) : null}</h6>
			<h6 className='my-2'><strong>Serviço:</strong> {service._id}</h6>
			<h6><strong>Valor:</strong> {getRightValue(date, service.value)}</h6>
		</div>
	)
}

export default SchedulingInfo