import { ReactNode, createContext } from 'react'
import { DEFAULT_SERVICE, ServicesState } from './types/services'

export const ServicesContext = createContext<ServicesState>([[DEFAULT_SERVICE], () => { }])

interface Props {
    children: ReactNode
    servicesState: ServicesState
}

const ServicesProvider = ({ children, servicesState }: Props) => {

    return (
        <ServicesContext.Provider value={servicesState}>
            {children}
        </ServicesContext.Provider>
    )

}

export default ServicesProvider