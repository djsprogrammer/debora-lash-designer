import { v4 } from 'uuid'
import { ServiceScheduling } from 'types/schedulings'

type Options = React.RefObject<HTMLSelectElement>
type Date = React.RefObject<HTMLInputElement>
type Client = React.RefObject<HTMLInputElement>
type Button = React.RefObject<HTMLButtonElement>

let optionsRef: Options
let dateRef: Date
let clientRef: Client
let addButtonRef: Button

export const saveRefsInMemory = (options: Options, date: Date, client: Client, addButton: Button) => {
	optionsRef = options
	dateRef = date
	clientRef = client
	addButtonRef = addButton
}

export const createSchedulingToSend = () => {
	if (dateRef.current && clientRef.current && optionsRef.current) {
		const serviceScheduling: ServiceScheduling = {
			frontId: v4(),
			service: JSON.parse(optionsRef.current.value),
			date: dateRef.current.value,
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

export const resetForm = () => {
	if (dateRef.current && clientRef.current) {
		dateRef.current.value = ''
		clientRef.current.value = ''
	}
	if (addButtonRef.current) addButtonRef.current.innerText = 'Agendar'
}