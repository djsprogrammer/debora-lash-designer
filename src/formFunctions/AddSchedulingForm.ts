import { ServiceScheduling } from 'types/schedulings'

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