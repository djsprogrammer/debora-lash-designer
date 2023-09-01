import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'App.css'
import { Services as TServices } from 'types/services'
import Header from 'components/fixed/Header'
import Navegation from 'components/fixed/Navegation'
import Loading from 'pages/Loading'
import Scheduling from 'pages/Scheduling'
import Services from 'pages/Services'
import Expenses from 'pages/Expenses'
import ServicesProvider from 'ServicesContext'
import { GET_SERVICES } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'

const App = () => {

    const [services, setServices] = useState<TServices>([])
    const [databaseLoaded, setDatabaseLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [navDisplay, setNavDisplay] = useState('d-none')

    const setServicesFromServer = (res: Response) => {
        res.json().then((services: TServices) => {
            if (services[0]) {
                // Ordenando os services por valor
                const orderServices = services.sort((a, b) => a.value.value - b.value.value)
                setServices(orderServices)
            }
        })
    }

    const searchServicesFromServer = useCallback(() => {
        fetch(GET_SERVICES)
            .then(res => {
                switch (res.status) {
                    case 200:
                        setServicesFromServer(res)
                        setDatabaseLoaded(true)
                        break
                    case 503:
                        alert(DATABASE_ERROR_TEXT)
                        searchServicesFromServer()
                        break
                }
            }).catch(() => {
                alert(SERVER_ERROR_TEXT)
                searchServicesFromServer()
            })
    }, [])

    useEffect(() => {
        searchServicesFromServer()
    }, [searchServicesFromServer])

    return (
        <div>
            <ServicesProvider servicesState={[services, setServices]}>
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
                                />
                                : <Loading />
                            } 
                        />
                        <Route path='/services'
                            element={<Services setCurrentPage={setCurrentPage} />} 
                        />
                        <Route path='/expenses'
                            element={<Expenses setCurrentPage={setCurrentPage} />} 
                        />
                    </Routes>
                </Router>
            </ServicesProvider>
        </div>
    )

}

export default App