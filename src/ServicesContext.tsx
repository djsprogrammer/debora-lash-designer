import { ReactNode, createContext } from 'react'
import { DEFAULT_USER, ServicesState } from './types/services'

export const ServicesContext = createContext<ServicesState>([[DEFAULT_USER], () => { }])

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