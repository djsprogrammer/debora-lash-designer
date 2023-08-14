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

export const schedulingsSimulation = [
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-01',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-02',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-03',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-04',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-05',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-06',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-07',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-08',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-09',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-10',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-01',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-02',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-03',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-04',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-05',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-06',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-07',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-08',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-09',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-10',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-01',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-02',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-03',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-04',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-05',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-06',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-07',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-08',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-09',
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-10',
        client: 'Fernanda',
        confirmed: false
    },
]