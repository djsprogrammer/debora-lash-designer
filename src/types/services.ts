export interface Service {
    name: string
    value: number
}

export interface ServiceScheduling {
	service: Service
	date: string
    currentMonth: number
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
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-02',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-03',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-04',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-05',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-06',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-07',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-08',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-09',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-08-10',
        currentMonth: 7,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-01',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-02',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-03',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-04',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-05',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-06',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-07',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-08',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-09',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-09-10',
        currentMonth: 8,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-01',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-02',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-03',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-04',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-05',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-06',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-07',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-08',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-09',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
    {
        service: {
            name: 'Volume Brasileiro',
            value: 100
        },
        date: '2023-10-10',
        currentMonth: 9,
        client: 'Fernanda',
        confirmed: false
    },
]