import { useState, useEffect } from 'react'
import SchedulingTable from './components/schedulingTable/Index'
import AnySchedulingAdvice from '../components/AnyAdvice'
import AddSchedulingForm from './components/AddSchedulingForm'
import { ServiceScheduling, schedulingsSimulation } from '../../types/services'
import { container } from '../../commonStyles'

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Index = ({ setCurrentPage }: Props) => {

	const [servicesScheduling, setServicesScheduling] = useState<ServiceScheduling[]>([])

	useEffect(() => {
		setServicesScheduling(schedulingsSimulation)
	}, [])

	useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{servicesScheduling[0]
				? <SchedulingTable servicesScheduling={servicesScheduling} setServicesScheduling={setServicesScheduling} />
				: <AnySchedulingAdvice page='agendamento' />}
			<AddSchedulingForm servicesScheduling={servicesScheduling} setServicesScheduling={setServicesScheduling} />
		</div>
	)

}

export default Index