import { Service } from './services'

export interface ServiceScheduling {
    frontId: string
	service: Service
	date: string
	client: string
}

export type ServiceSchedulings = ServiceScheduling[]

export type SetScheduling = React.Dispatch<React.SetStateAction<ServiceScheduling>>
export type SetSchedulings = React.Dispatch<React.SetStateAction<ServiceScheduling[]>>

export type SchedulingsState = [ServiceSchedulings, SetSchedulings]

export interface Props {
    schedulingsState: SchedulingsState
}