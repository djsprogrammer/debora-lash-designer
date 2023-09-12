import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'App.css'

import { orderServices } from 'formFunctions/common'
import { GET_ALL_DOCS } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'

import { AllDocs } from 'types/allDocs'
import { Services as TServices } from 'types/services'
import { ServiceSchedulings } from 'types/schedulings'
import { Expenses as TExpenses } from 'types/expenses'

import Header from 'components/fixed/Header'
import Navegation from 'components/fixed/Navegation'
import Loading from 'pages/Loading'
import Scheduling from 'pages/Scheduling'
import FinancialMetrics from 'pages/FinancialMetrics'
import Services from 'pages/Services'
import Expenses from 'pages/Expenses'

import DocsProvider from 'DocsContext'

const App = () => {

    // Documentos usados na aplicação
    const [services, setServices] = useState<TServices>([])
    const [schedulings, setSchedulings] = useState<ServiceSchedulings>([])
    const [expenses, setExpenses] = useState<TExpenses>([])

    const [databaseLoaded, setDatabaseLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [navDisplay, setNavDisplay] = useState('d-none')

    const setDocsFromServer = (res: Response) => {
        res.json().then((allDocs: AllDocs) => {

            const services = allDocs.services
            const schedulings = allDocs.schedulings
            const expenses = allDocs.expenses

            // Ordenando os documentos
            const orderedServices = orderServices(services)
            const orderSchedulings = schedulings.sort((a, b) => a.date.localeCompare(b.date)).reverse()
            const orderExpenses = expenses.sort((a, b) => a.date.localeCompare(b.date)).reverse()

            setServices(orderedServices)
            setSchedulings(orderSchedulings)
            setExpenses(orderExpenses)

        })
    }

    const searchDocsFromServer = useCallback(() => {
        fetch(GET_ALL_DOCS)
            .then(res => {
                switch (res.status) {
                    case 200:
                        setDocsFromServer(res)
                        setDatabaseLoaded(true)
                        break
                    case 503:
                        alert(DATABASE_ERROR_TEXT)
                        searchDocsFromServer()
                        break
                }
            }).catch(() => {
                alert(SERVER_ERROR_TEXT)
                searchDocsFromServer()
            })
    }, [])

    useEffect(() => {
        // Buscando dados do servidor ao iniciar aplicação
        searchDocsFromServer()
    }, [searchDocsFromServer])

    return (
        <div>
            <DocsProvider servicesState={[services, setServices]}>
                <Router>
                    <Header />
                    <Navegation navDisplay={navDisplay} currentPage={currentPage} />
                    <Routes>
                        <Route 
                            path='/'
                            element={
                                databaseLoaded
                                ? <Scheduling // Página padrão
                                    setNavDisplay={setNavDisplay}
                                    setCurrentPage={setCurrentPage}
                                    schedulingsState={[schedulings, setSchedulings]}
                                />
                                : <Loading />
                            } 
                        />
                        <Route path='/financial'
                            element={<FinancialMetrics setCurrentPage={setCurrentPage} />}
                        />
                        <Route path='/services'
                            element={<Services setCurrentPage={setCurrentPage} />} 
                        />
                        <Route path='/expenses'
                            element={
                                <Expenses
                                    setCurrentPage={setCurrentPage}
                                    expensesState={[expenses, setExpenses]}
                                />
                            } 
                        />
                    </Routes>
                </Router>
            </DocsProvider>
        </div>
    )

}

export default App