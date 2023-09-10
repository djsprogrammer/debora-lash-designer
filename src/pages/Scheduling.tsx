import { useContext, useState, useEffect } from 'react'
import { ServicesContext } from 'ServicesContext'
import SchedulingTable from 'components/schedulings/SchedulingTable'
import AnySchedulingAdvice from 'components/pages/AnyAdvice'
import AddSchedulingForm from 'components/schedulings/AddSchedulingForm/AddSchedulingForm'
import RegisterButton from 'components/pages/RegisterButton'
import { SchedulingsState } from 'types/schedulings'
import { Props } from 'types/pages'
import { container } from 'commonStyles'

interface SchedulingProps extends Props {
	setNavDisplay: React.Dispatch<React.SetStateAction<string>>
	schedulingsState: SchedulingsState
}

const Scheduling = ({ setNavDisplay, setCurrentPage, schedulingsState }: SchedulingProps) => {

	useEffect(() => {
		// Deixando a barra de navegação a mostra 
		// depois do carregamento do banco de dados
		setNavDisplay('d-flex')
	}, [setNavDisplay])

	useEffect(() => {
		setCurrentPage(0)
	}, [setCurrentPage])

	const [services] = useContext(ServicesContext)
	const [schedulings, setSchedulings] = schedulingsState
	const [addSchedulingForm, setAddSchedulingForm] = useState(false)

	const DoesServiceExist = () => {
		// Só permitindo agendar com algum serviço salvo
		return services[0]
		? <RegisterButton setForm={setAddSchedulingForm} text='Agendar' />
		: <div className='alert alert-warning'>Não existe serviço para realizar um agendamento</div>
	}

	return (
		<div className={container}>
			{
				schedulings[0]
					? <SchedulingTable 
						schedulingsState={[schedulings, setSchedulings]}
						/>
					: <AnySchedulingAdvice page='agendamento' />
			}
			{
				addSchedulingForm
					? <AddSchedulingForm 
						schedulingsState={[schedulings, setSchedulings]}
						setAddSchedulingForm={setAddSchedulingForm}
						/>
					: <DoesServiceExist />
			}
			
		</div>
	)

}

export default Scheduling