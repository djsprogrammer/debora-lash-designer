import { useState, useEffect } from 'react'
import SchedulingTable from 'components/schedulings/SchedulingTable'
import AnySchedulingAdvice from 'components/pages/AnyAdvice'
import AddSchedulingForm from 'components/schedulings/AddSchedulingForm'
import { ServiceSchedulings } from 'types/schedulings'
import { Props } from 'types/pages'
import { container } from 'commonStyles'
import { SERVER_URL } from 'App'

const Scheduling = ({ setCurrentPage }: Props) => {

	const [servicesScheduling, setServicesScheduling] = useState<ServiceSchedulings>([])
	const [blockedActions, setBlockedActions] = useState(false)

	useEffect(() => {
		fetch(`${SERVER_URL}/all-schedulings`)
			.then(res => res.json())
			.then((schedulings: ServiceSchedulings) => {
				const orderSchedulings = schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
				setServicesScheduling(orderSchedulings)
			})
	}, [])

	useEffect(() => {
		setCurrentPage(0)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{
				servicesScheduling[0]
					? <SchedulingTable 
						schedulingsState={[servicesScheduling, setServicesScheduling]}
						blockedActions={blockedActions}
						/>
					: <AnySchedulingAdvice page='agendamento' />
			}
			<AddSchedulingForm 
				schedulingsState={[servicesScheduling, setServicesScheduling]}
				setBlockedActions={setBlockedActions}
			/>
		</div>
	)

}

export default Scheduling