import { v4 } from 'uuid'
import { ServiceScheduling } from 'types/schedulings'

type Options = React.RefObject<HTMLSelectElement>
type Date = React.RefObject<HTMLInputElement>
type Client = React.RefObject<HTMLInputElement>

export const createSchedulingToSend = (options: Options, date: Date, client: Client) => {
	if (date.current && client.current && options.current) {
		const serviceScheduling: ServiceScheduling = {
			frontId: v4(),
			service: JSON.parse(options.current.value),
			date: date.current.value,
			client: client.current.value
		}
		return serviceScheduling
	}
}

export const responseHandler = (res: Response, 
	setServicesScheduling: React.Dispatch<React.SetStateAction<ServiceScheduling[]>>,
	newSchedulings: ServiceScheduling[]) => {
	switch (res.status) {
		case 201:
			setServicesScheduling(newSchedulings)
			break
		case 503:
			alert('Erro ao consultar banco de dados')
			break
	}
}

export const resetForm = (date: React.RefObject<HTMLInputElement>, 
	clientElement: React.RefObject<HTMLInputElement>,
	addButton: React.RefObject<HTMLButtonElement>) => {
	if (date.current && clientElement.current) {
		date.current.value = ''
		clientElement.current.value = ''
	}
	if (addButton.current) addButton.current.innerText = 'Agendar'
}