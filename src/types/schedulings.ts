import { Service } from './services'

export interface ServiceScheduling {
    frontId: string
	service: Service
	date: string
	client: string
}

export interface Props {
    schedulingsState: [ServiceScheduling[], React.Dispatch<React.SetStateAction<ServiceScheduling[]>>]
}