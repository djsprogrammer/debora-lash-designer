import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Services as TServices } from './types/services'
import Header from './components/fixed/Header'
import LoadingPage from 'components/main/LoadingPage'
import Navegation from './components/fixed/Navegation'
import Scheduling from './pages/Scheduling'
import Services from './pages/Services'
import Expenses from './pages/Expenses'
import ServicesProvider from './ServicesContext'

export const SERVER_URL = 'http://localhost:8080'

const App = () => {

    const [services, setServices] = useState<TServices>([])
    const [databaseLoaded, setDatabaseLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [navDisplay, setNavDisplay] = useState('d-none')

    const getDataFromServer = (res: Response) => {
        res.json().then((services: TServices) => {
            if (services[0]) setServices(services.sort((a, b) => a.value - b.value))
            setDatabaseLoaded(true)
        })
    }

    useEffect(() => {
        const searchDataFromServer = () => {
            fetch(`${SERVER_URL}/all-services`)
            .then(res => {
                switch (res.status) {
                    case 200:
                        getDataFromServer(res)
                        break
                    case 503:
                        alert('Erro ao consultar banco de dados')    
                        searchDataFromServer()
                        break
                }
            }).catch(() => {
                alert('Erro ao conectar com o servidor')
                searchDataFromServer()
            })
        }
        searchDataFromServer()
    }, [])

    const HandlePages = () => {
        if (databaseLoaded) {
            // Deixando a barra de navegação visível
            setNavDisplay('d-flex')
            // Atual página padrão
            return <Scheduling setCurrentPage={setCurrentPage} />
        } else {
            return <LoadingPage />
        }
    }

    return (
        <div>
            <ServicesProvider servicesState={[services, setServices]}>
                <Router>
                    <Header />
                    <Navegation navDisplay={navDisplay} currentPage={currentPage} />
                    <Routes>
                        <Route path='/' element={<HandlePages />} />
                        <Route path='/services' element={<Services setCurrentPage={setCurrentPage} />} />
                        <Route path='/expenses' element={<Expenses setCurrentPage={setCurrentPage} />} />
                    </Routes>
                </Router>
            </ServicesProvider>
        </div>
    )

}

export default App