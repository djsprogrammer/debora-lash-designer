import { useState, useEffect } from 'react'
import SchedulingTable from 'components/schedulings/SchedulingTable'
import AnySchedulingAdvice from 'components/pages/AnyAdvice'
import AddSchedulingForm from 'components/schedulings/AddSchedulingForm'
import RegisterButton from 'components/pages/RegisterButton'
import { ServiceSchedulings } from 'types/schedulings'
import { Props } from 'types/pages'
import { container } from 'commonStyles'
import { GET_SCHEDULINGS } from 'constants/urls'

export const BACKEND_SCHEDULINGS = 'backend-schedulings'

interface SchedulingProps extends Props {
	setNavDisplay: React.Dispatch<React.SetStateAction<string>>
}

const Scheduling = ({ setNavDisplay, setCurrentPage }: SchedulingProps) => {

	useEffect(() => {
		// Deixando a barra de navegação a mostra 
		// depois do carregamento do banco de dados
		setNavDisplay('d-flex')
	}, [setNavDisplay])

	useEffect(() => {
		setCurrentPage(0)
	}, [setCurrentPage])

	const cacheSchedulings = sessionStorage.getItem(BACKEND_SCHEDULINGS)

	const getSchedulingsFromCache = () => {
		// Iniciando o state com os schedulings em cache da sessão
		if (cacheSchedulings) {
			return JSON.parse(cacheSchedulings)
		} else {
			return []
		}
	}

	const [servicesScheduling, setServicesScheduling] = useState<ServiceSchedulings>(getSchedulingsFromCache)
	const [addSchedulingForm, setAddSchedulingForm] = useState(false)

	useEffect(() => {
		// Verificando se já existe os schedulings em cache
		if (!cacheSchedulings) {
			fetch(GET_SCHEDULINGS)
				.then(res => res.json())
				.then((schedulings: ServiceSchedulings) => {
					const orderSchedulings = schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
					setServicesScheduling(orderSchedulings)
					// Salvando em cache para futuras renderizações na mesma sessão
					sessionStorage.setItem(BACKEND_SCHEDULINGS, JSON.stringify(orderSchedulings))
				})
		} 
	}, [cacheSchedulings])

	return (
		<div className={container}>
			{
				servicesScheduling[0]
					? <SchedulingTable 
						schedulingsState={[servicesScheduling, setServicesScheduling]}
						/>
					: <AnySchedulingAdvice page='agendamento' />
			}
			{
				addSchedulingForm
					? <AddSchedulingForm 
						schedulingsState={[servicesScheduling, setServicesScheduling]}
						setAddSchedulingForm={setAddSchedulingForm}
						/>
					: <RegisterButton setForm={setAddSchedulingForm} text='Agendar' />
			}
			
		</div>
	)

}

export default Scheduling