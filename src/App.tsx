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
    const [loadingDatabaseText, setLoadingDatabaseText] = useState('Carregando...')
    const [databaseLoaded, setDatabaseLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [navDisplay, setNavDisplay] = useState('d-none')

    const getDataFromServer = (res: Response) => {
        res.json().then((services: TServices) => {
            if (services[0]) setServices(services.sort((a, b) => a.value - b.value))
            setTimeout(() => {
                setDatabaseLoaded(true)
            }, 500)
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
                        setLoadingDatabaseText('')
                        setTimeout(() => {
                            alert('Erro ao consultar banco de dados')    
                            setLoadingDatabaseText('Carregando...')
                            searchDataFromServer()
                        }, 10)
                        break
                }
            }).catch(() => {
                setLoadingDatabaseText('')
                setTimeout(() => {
                    alert('Erro ao conectar com o servidor')
                    setLoadingDatabaseText('Carregando...')
                    searchDataFromServer()
                }, 10)
            })
        }
        searchDataFromServer()
    }, [])

    const HandlePages = () => {
        if (databaseLoaded) {
            setNavDisplay('d-flex')
            // Atual página padrão
            return <Scheduling setCurrentPage={setCurrentPage} />
        } else {
            return <LoadingPage loadingDatabaseText={loadingDatabaseText} />
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