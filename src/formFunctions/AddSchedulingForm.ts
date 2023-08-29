import { v4 } from 'uuid'
import { ServiceScheduling } from 'types/schedulings'

type Options = React.RefObject<HTMLSelectElement>
type Client = React.RefObject<HTMLInputElement>

let optionsRef: Options
let clientRef: Client

export const saveRefsInMemory = (options: Options, client: Client) => {
	optionsRef = options
	clientRef = client
}

export const createSchedulingToSend = (date: string) => {
	if (clientRef.current && optionsRef.current) {
		const serviceScheduling: ServiceScheduling = {
			_id: v4(),
			service: JSON.parse(optionsRef.current.value),
			date,
			client: clientRef.current.value
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