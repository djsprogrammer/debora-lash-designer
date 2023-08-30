import { v4 } from 'uuid'
import { ServiceScheduling } from 'types/schedulings'
import { BACKEND_SCHEDULINGS } from 'pages/Scheduling'

export const createSchedulingToSend = (date: string, option: string, client: string) => {
	const serviceScheduling: ServiceScheduling = {
		_id: v4(),
		service: JSON.parse(option),
		date,
		client: client
	}
	return serviceScheduling
}

export const responseHandler = (res: Response, 
	setServicesScheduling: React.Dispatch<React.SetStateAction<ServiceScheduling[]>>,
	newSchedulings: ServiceScheduling[]) => {
	switch (res.status) {
		case 201:
			setServicesScheduling(newSchedulings)
			// Salvando em cache
			sessionStorage.setItem(BACKEND_SCHEDULINGS, JSON.stringify(newSchedulings))
			break
		case 503:
			alert('Erro ao consultar banco de dados')
			break
	}
}