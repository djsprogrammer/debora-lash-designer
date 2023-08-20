import { Service } from './services'

export interface ServiceScheduling {
    id: string
	service: Service
	date: string
	client: string
    confirmed: boolean
}

export interface Props {
    schedulingsState: [ServiceScheduling[], React.Dispatch<React.SetStateAction<ServiceScheduling[]>>]
}