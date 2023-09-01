import { useState, useEffect } from 'react'
import SchedulingTable from 'components/schedulings/SchedulingTable'
import AnySchedulingAdvice from 'components/pages/AnyAdvice'
import AddSchedulingForm from 'components/schedulings/AddSchedulingForm'
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

	const [schedulings, setSchedulings] = schedulingsState
	const [addSchedulingForm, setAddSchedulingForm] = useState(false)

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
					: <RegisterButton setForm={setAddSchedulingForm} text='Agendar' />
			}
			
		</div>
	)

}

export default Scheduling