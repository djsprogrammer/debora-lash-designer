import { useEffect } from 'react'
import SchedulingTable from './components/SchedulingTable'
import AnySchedulingAdvice from '../components/AnyAdvice'
import AddSchedulingForm from './components/AddSchedulingForm'
import { ServiceScheduling } from '../../types/services'
import { container } from '../../commonStyles'

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
	schedulingState: [ServiceScheduling[], React.Dispatch<React.SetStateAction<ServiceScheduling[]>>]
}

const Index = ({ setCurrentPage, schedulingState }: Props) => {

	const [servicesScheduling, setServicesScheduling] = schedulingState

	useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{servicesScheduling[0] 
			? <SchedulingTable servicesScheduling={servicesScheduling} />
			: <AnySchedulingAdvice page='agendamento' />}
			<AddSchedulingForm servicesScheduling={servicesScheduling} setServicesScheduling={setServicesScheduling} />
		</div>
	)

}

export default Index