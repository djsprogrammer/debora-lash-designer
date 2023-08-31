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

const App = () => {

    const [services, setServices] = useState<TServices>([])
    const [databaseLoaded, setDatabaseLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [navDisplay, setNavDisplay] = useState('d-none')

    const setServicesFromServer = (res: Response) => {
        res.json().then((services: TServices) => {
            if (services[0]) {
                // Ordenando os services por valor
                const orderServices = services.sort((a, b) => a.value - b.value)
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
                        alert('Erro ao consultar banco de dados')
                        searchServicesFromServer()
                        break
                }
            }).catch(() => {
                alert('Erro ao conectar com o servidor')
                searchServicesFromServer()
            })
    }, [])

    useEffect(() => {
        searchServicesFromServer()
    }, [searchServicesFromServer])

    const MainPage = () => {
        if (databaseLoaded) {
            return <Scheduling 
                setNavDisplay={setNavDisplay}
                setCurrentPage={setCurrentPage} 
            />
        } else {
            return <Loading />
        }
    }

    return (
        <div>
            <ServicesProvider servicesState={[services, setServices]}>
                <Router>
                    <Header />
                    <Navegation navDisplay={navDisplay} currentPage={currentPage} />
                    <Routes>
                        <Route path='/' element={<MainPage />} />
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