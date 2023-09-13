import { createContext } from 'react'

import { DEFAULT_SERVICE, ServicesState } from './types/services'
import { DEFAULT_SCHEDULING, SchedulingsState } from 'types/schedulings'

interface TDocsContext {
    services: ServicesState
    schedulings: SchedulingsState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }],
    schedulings: [[DEFAULT_SCHEDULING], () => {  }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
    services: ServicesState
    schedulings: SchedulingsState
}

const DocsProvider = ({ children, services, schedulings }: DocsProviderProps) => {

    const contextValues: TDocsContext = {
        services,
        schedulings
    }

    return (
        <DocsContext.Provider value={contextValues}>
            {children}
        </DocsContext.Provider>
    )

}

export default DocsProvider