export interface Service {
    name: string
    value: string
}

export type Services = Service[]

export type SetServices = React.Dispatch<React.SetStateAction<Services>>