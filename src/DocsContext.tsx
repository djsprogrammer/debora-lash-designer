import { createContext } from 'react'
import { DEFAULT_SERVICE, ServicesState } from './types/services'

interface TDocsContext {
    services: ServicesState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
    servicesState: ServicesState
}

const DocsProvider = ({ children, servicesState }: DocsProviderProps) => {

    const contextValues = {
        services: servicesState
    }

    return (
        <DocsContext.Provider value={contextValues}>
            {children}
        </DocsContext.Provider>
    )

}

export default DocsProvider