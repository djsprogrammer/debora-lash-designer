import { useState, useEffect } from 'react'
import SchedulingTable from './components/schedulingTable/SchedulingTable'
import AnySchedulingAdvice from '../components/AnyAdvice'
import AddSchedulingForm from './components/AddSchedulingForm'
import schedulings from '../../schedulings'
import { ServiceScheduling } from '../../types/services'
import { container } from '../../commonStyles'

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Scheduling = ({ setCurrentPage }: Props) => {

	const [servicesScheduling, setServicesScheduling] = useState<ServiceScheduling[]>([])

	useEffect(() => {
		setServicesScheduling([...schedulings].reverse())
	}, [])

	useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{servicesScheduling[0]
				? <SchedulingTable schedulingsState={[servicesScheduling, setServicesScheduling]} />
				: <AnySchedulingAdvice page='agendamento' />}
			<AddSchedulingForm schedulingsState={[servicesScheduling, setServicesScheduling]} />
		</div>
	)

}

export default Scheduling