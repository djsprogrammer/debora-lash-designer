export interface Service {
    name: string
    value: number
}

export type Services = Service[]

export type SetServices = React.Dispatch<React.SetStateAction<Services>>

export type ServicesState = [Services, SetServices]

export const DEFAULT_USER = {
    name: '',
    value: 0
}