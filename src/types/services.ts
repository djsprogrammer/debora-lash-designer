export interface Service {
    _id: string
    value: number
}

export type Services = Service[]

export type SetService = React.Dispatch<React.SetStateAction<Service>>

export type SetServices = React.Dispatch<React.SetStateAction<Services>>

export type ServicesState = [Services, SetServices]

export const DEFAULT_SERVICE = {
    _id: '',
    value: 0
}