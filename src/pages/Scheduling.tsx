import { useState, useEffect } from 'react'
import SchedulingTable from 'components/schedulings/SchedulingTable'
import AnySchedulingAdvice from 'components/pages/AnyAdvice'
import AddSchedulingForm from 'components/schedulings/AddSchedulingForm'
import { ServiceScheduling } from 'types/schedulings'
import { Props } from 'types/pages'
import { container } from 'commonStyles'
import { SERVER_URL } from 'App'

const Scheduling = ({ setCurrentPage }: Props) => {

	const [servicesScheduling, setServicesScheduling] = useState<ServiceScheduling[]>([])

	useEffect(() => {
		fetch(`${SERVER_URL}/all-schedulings`)
			.then(res => res.json())
			.then((schedulings: ServiceScheduling[]) => {
				const orderSchedulings = schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
				setServicesScheduling(orderSchedulings)
			})
	}, [])

	useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{
				servicesScheduling[0]
					? <SchedulingTable 
						schedulingsState={[servicesScheduling, setServicesScheduling]} 
						/>
					: <AnySchedulingAdvice page='agendamento' />
			}
			<AddSchedulingForm 
				schedulingsState={[servicesScheduling, setServicesScheduling]} 
			/>
		</div>
	)

}

export default Scheduling