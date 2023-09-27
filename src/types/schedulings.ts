interface SchedulingService {
	name: string[]
	value: number[]
}

export interface Scheduling {
    _id: string
	service: SchedulingService
	date: string
	client: string
}

export type Schedulings = Scheduling[]

export type SetScheduling = React.Dispatch<React.SetStateAction<Scheduling>>
export type SetSchedulings = React.Dispatch<React.SetStateAction<Schedulings>>

export type SchedulingsState = [Schedulings, SetSchedulings]

export interface Props {
    schedulingsState: SchedulingsState
}

export const DEFAULT_SCHEDULING: Scheduling = {
	_id: '',
	service: {
		name: [''],
		value: [0]
	},
	date: '',
	client: ''
}