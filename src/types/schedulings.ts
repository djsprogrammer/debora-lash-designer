interface SchedulingService {
	name: string[]
	value: number[]
}

export interface ServiceScheduling {
    _id: string
	service: SchedulingService
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

export const DEFAULT_SCHEDULING: ServiceScheduling = {
	_id: '',
	service: {
		name: [''],
		value: [0]
	},
	date: '',
	client: ''
}