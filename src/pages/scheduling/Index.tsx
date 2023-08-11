import { useState, useEffect } from 'react'
import AddSchedulingForm from './components/AddSchedulingForm'
import { Service } from '../../types/services'

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

interface ServiceScheduling {
	service: Service
	date: string
	client: string
}

const Index = ({ setCurrentPage }: Props) => {

	const [servicesScheduling, setServicesScheduling] = useState<ServiceScheduling[]>([])

	useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

	useEffect(() => {
		console.log(servicesScheduling)
	}, [servicesScheduling])

	return (
		<div>
			<AddSchedulingForm setServicesScheduling={setServicesScheduling} />
		</div>
	)

}

export default Index