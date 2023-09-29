import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'App.css'

import { Services as TServices } from 'types/services'
import { Schedulings } from 'types/schedulings'
import { Expenses as TExpenses } from 'types/expenses'

import Header from 'components/fixed/header/Header'
import Info from 'pages/Info'
import Scheduling from 'pages/Scheduling'
import Services from 'pages/Services'
import Expenses from 'pages/Expenses'

import DocsProvider from 'DocsContext'

const App = () => {

    // Documentos usados na aplicação
    const [services, setServices] = useState<TServices>([])
    const [schedulings, setSchedulings] = useState<Schedulings>([])
    const [expenses, setExpenses] = useState<TExpenses>([])

    const [currentPage, setCurrentPage] = useState(0)

    return (
        <div>
            <DocsProvider
                services={[services, setServices]}
                schedulings={[schedulings, setSchedulings]}
                expenses={[expenses, setExpenses]}
            >
                <Router>
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