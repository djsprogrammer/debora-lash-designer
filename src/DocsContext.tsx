import { createContext } from 'react'

import { DEFAULT_SERVICE, ServicesState } from './types/services'
import { DEFAULT_SCHEDULING, SchedulingsState } from 'types/schedulings'
import { DEFAULT_EXPENSE, ExpensesState } from 'types/expenses'

interface TDocsContext {
    services: ServicesState
    schedulings: SchedulingsState
    expenses: ExpensesState
}

const DEFAULT_CONTEXT: TDocsContext = {
    services: [[DEFAULT_SERVICE], () => { }],
    schedulings: [[DEFAULT_SCHEDULING], () => {  }],
    expenses: [[DEFAULT_EXPENSE], () => { }]
}

export const DocsContext = createContext<TDocsContext>(DEFAULT_CONTEXT)

interface DocsProviderProps {
    children: React.ReactNode
    services: ServicesState
    schedulings: SchedulingsState
    expenses: ExpensesState
}

const DocsProvider = ({ children, services, schedulings, expenses }: DocsProviderProps) => {

    const contextValues: TDocsContext = {
        services,
        schedulings,
        expenses
    }

    return (
        <DocsContext.Provider value={contextValues}>
            {children}
        </DocsContext.Provider>
    )

}

export default DocsProvider