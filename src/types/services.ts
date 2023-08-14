export interface Service {
    name: string
    value: number
}

export interface ServiceScheduling {
	service: Service
	date: string
	client: string
    confirmed: boolean
}

export type Services = Service[]

export type SetServices = React.Dispatch<React.SetStateAction<Services>>

export type ServicesState = [Services, SetServices]

export const DEFAULT_USER = {
    name: '',
    value: 0
}