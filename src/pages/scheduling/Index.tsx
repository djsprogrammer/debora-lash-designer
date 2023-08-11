import { useEffect } from 'react'
import SchedulingTable from './components/SchedulingTable'
import AddSchedulingForm from './components/AddSchedulingForm'
import { ServiceScheduling } from '../../types/services'

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
		<div className='container'>
			<SchedulingTable servicesScheduling={servicesScheduling} />
			<AddSchedulingForm setServicesScheduling={setServicesScheduling} />
		</div>
	)

}

export default Index