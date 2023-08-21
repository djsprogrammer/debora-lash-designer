import { useState, useEffect } from 'react'
import SchedulingTable from '../components/schedulings/SchedulingTable'
import AnySchedulingAdvice from '../components/pages/AnyAdvice'
import AddSchedulingForm from '../components/schedulings/AddSchedulingForm'
import { ServiceScheduling } from '../types/schedulings'
import { Props } from '../types/pages'
import { container } from '../commonStyles'

const Scheduling = ({ setCurrentPage }: Props) => {

	const [servicesScheduling, setServicesScheduling] = useState<ServiceScheduling[]>([])

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