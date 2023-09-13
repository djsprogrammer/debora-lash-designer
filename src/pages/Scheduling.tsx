import { useContext, useState, useEffect } from 'react'

import { container } from 'commonStyles'

import { Props } from 'types/pages'

import SchedulingTable from 'components/schedulings/SchedulingTable'
import AnySchedulingAdvice from 'components/pages/AnyAdvice'
import AddSchedulingForm from 'components/schedulings/AddSchedulingForm/AddSchedulingForm'
import RegisterButton from 'components/pages/RegisterButton'

import { DocsContext } from 'DocsContext'

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

	const [services] = useContext(DocsContext).services
	const [schedulings] = useContext(DocsContext).schedulings
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
					? <SchedulingTable />
					: <AnySchedulingAdvice page='agendamento' />
			}
			{
				addSchedulingForm
					? <AddSchedulingForm 
						setAddSchedulingForm={setAddSchedulingForm}
						/>
					: <DoesServiceExist />
			}
			
		</div>
	)

}

export default Scheduling