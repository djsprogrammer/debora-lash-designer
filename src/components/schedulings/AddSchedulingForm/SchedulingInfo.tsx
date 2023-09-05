import { dateFormat } from 'formFunctions/common'
import { Service, Value } from 'types/services'

interface SchedulingInfoProps {
	client: string
	date: string
	service: Service
	getRightValue: (schedulingDate: string, serviceValues: Value[]) => number
}

const SchedulingInfo = ({ client, date, service, getRightValue }: SchedulingInfoProps) => {
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