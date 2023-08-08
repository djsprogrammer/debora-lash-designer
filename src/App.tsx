import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Services as TServices } from './types/services'
import Header from './fixedComponents/Header'
import Services from './services/Index'
import ServicesProvider from './ServicesContext'

export const SERVER_URL = 'http://localhost:8080'

const Index = () => {

    const [services, setServices] = useState<TServices>([])
    const [loadingDatabaseText, setLoadingDatabaseText] = useState('Carregando banco de dados...')
    const [databaseLoaded, setDatabaseLoaded] = useState(false)

    const getDataFromServer = (res: Response) => {
        res.json().then((services: TServices) => {
            if (services[0]) setServices(services)
            setTimeout(() => {
                setDatabaseLoaded(true)
            }, 500)
        })
    }

    useEffect(() => {
        fetch(`${SERVER_URL}/all-services`)
            .then(res => {
                switch (res.status) {
                    case 200:
                        getDataFromServer(res)
                        break
                    case 503:
                        setLoadingDatabaseText('Erro ao consultar banco de dados')
                        break
                }
            }).catch(() => setLoadingDatabaseText('Erro ao conectar com o servidor'))
    }, [])

    return (
        <div>
            <Header />
            <ServicesProvider servicesState={[services, setServices]}>
                {databaseLoaded ? <Services /> : <h4 className='text-center my-4'>{loadingDatabaseText}</h4>}
            </ServicesProvider>
        </div>
    )

}

export default Index