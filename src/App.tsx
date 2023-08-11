import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Services as TServices, Service } from './types/services'
import Header from './fixedComponents/Header'
import Navegation from './fixedComponents/Navegation'
import Scheduling from './pages/scheduling/Index'
import Services from './pages/services/Index'
import ServicesProvider from './ServicesContext'

export const SERVER_URL = 'http://localhost:8080'

interface ServiceScheduling {
    service: Service
    date: string
    client: string
}

const Index = () => {

    const [services, setServices] = useState<TServices>([])
    const [loadingDatabaseText, setLoadingDatabaseText] = useState('Carregando...')
    const [databaseLoaded, setDatabaseLoaded] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [servicesScheduling, setServicesScheduling] = useState<ServiceScheduling[]>([])

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
        return databaseLoaded 
        ? <Scheduling setCurrentPage={setCurrentPage} schedulingState={[servicesScheduling, setServicesScheduling]} /> // Atual página padrão
        : <h4 className='text-center my-4'>{loadingDatabaseText}</h4>
    }

    return (
        <div>
            <ServicesProvider servicesState={[services, setServices]}>
                <Router>
                    <Header />
                    <Navegation currentPage={currentPage} />
                    <Routes>
                        <Route path='/' element={<HandlePages />} />
                        <Route path='/services' element={<Services setCurrentPage={setCurrentPage} />} />
                    </Routes>
                </Router>
            </ServicesProvider>
        </div>
    )

}

export default Index