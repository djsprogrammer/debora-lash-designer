interface Value {
    value: number
    date: string
}

export interface Service {
    _id: string
    value: Value
}

export type Services = Service[]

export type SetService = React.Dispatch<React.SetStateAction<Service>>

export type SetServices = React.Dispatch<React.SetStateAction<Services>>

export type ServicesState = [Services, SetServices]

export const DEFAULT_SERVICE: Service = {
    _id: '',
    value: {
        value: 0,
        date: ''
    }
}