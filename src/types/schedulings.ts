import { Service } from './services'

export interface ServiceScheduling {
    frontId: string
	service: Service
	date: string
	client: string
    confirmed: boolean
}

export interface Props {
    schedulingsState: [ServiceScheduling[], React.Dispatch<React.SetStateAction<ServiceScheduling[]>>]
}