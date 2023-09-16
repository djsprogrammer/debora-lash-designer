import { useCallback, useEffect, useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'App.css'

import { orderServices } from 'formFunctions/common'
import { GET_ALL_DOCS } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'

import { AllDocs } from 'types/allDocs'
import { Services as TServices } from 'types/services'
import { ServiceSchedulings } from 'types/schedulings'
import { Expenses as TExpenses } from 'types/expenses'

import Header from 'components/fixed/header/Header'
import Loading from 'pages/Loading'
import Info from 'pages/Info'
import Scheduling from 'pages/Scheduling'
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

    const setDocsFromServer = (res: Response) => {
        res.json().then((allDocs: AllDocs) => {

            const services = allDocs.services
            const schedulings = allDocs.schedulings
            const expenses = allDocs.expenses

            // Ordenando os documentos
            const orderedServices = orderServices(services)
            const orderedSchedulings = schedulings
                .sort((a, b) => a.date.localeCompare(b.date)).reverse()
            const orderedExpenses = expenses
                .sort((a, b) => a.date.localeCompare(b.date)).reverse()

            setServices(orderedServices)
            setSchedulings(orderedSchedulings)
            setExpenses(orderedExpenses)

            setDatabaseLoaded(true)

        })
    }

    const searchDocsFromServer = useCallback(() => {
        fetch(GET_ALL_DOCS)
            .then(res => {
                switch (res.status) {
                    case 200:
                        setDocsFromServer(res)
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
            <DocsProvider
                services={[services, setServices]}
                schedulings={[schedulings, setSchedulings]}
                expenses={[expenses, setExpenses]}
            >
                <Router>
                    {
                        !databaseLoaded
                        ? <Loading />
                        : null
                    }
                    <Header currentPage={currentPage} />
                    <Routes>
                        <Route
                            path='/'
                            element={<Info setCurrentPage={setCurrentPage} />}
                        />
                        <Route
                            path='/schedulings'
                            element={<Scheduling setCurrentPage={setCurrentPage} />}
                        />
                        <Route
                            path='/services'
                            element={<Services setCurrentPage={setCurrentPage} />}
                        />
                        <Route
                            path='/expenses'
                            element={<Expenses setCurrentPage={setCurrentPage} />}
                        />
                    </Routes>
                </Router>
            </DocsProvider>
        </div>
    )

}

export default App