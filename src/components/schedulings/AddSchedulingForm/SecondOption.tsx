import { useEffect } from 'react'
import ServicesOptionsInput from './ServicesOptionsInput'
import { Services, Service } from 'types/services'

interface SecondOptionProps {
	services: Services
	service: Service
	setShowSecondOption: React.Dispatch<React.SetStateAction<boolean>>
	setSecondOption: React.Dispatch<React.SetStateAction<string>>
	setFirstOptionOnSecondService: (firstOption: string) => void
}

const SecondOption = ({ services, service, setShowSecondOption, setSecondOption, setFirstOptionOnSecondService }: SecondOptionProps) => {

	// Não disponibilizando a primeira opção
	const servicesForSecondOption = services.filter(current => {
		return current._id !== service._id
	})

	const firstOption = JSON.stringify(servicesForSecondOption[0])

	useEffect(() => {
		setFirstOptionOnSecondService(firstOption)
	}, [setFirstOptionOnSecondService, firstOption])

	return (
		<div className='mt-1 mb-3'>
			<ServicesOptionsInput setOption={setSecondOption} services={servicesForSecondOption} />
			<button onClick={() => setShowSecondOption(false)} className='btn btn-sm btn-link' type='button'>Cancelar</button>
		</div>
	)

}

export default SecondOption