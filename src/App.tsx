import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Services as TServices } from './types/services'
import Header from './fixedComponents/Header'
import Services from './services/Index'
import ServicesProvider from './ServicesContext'

const Index = () => {

    const [services, setServices] = useState<TServices>([])

    const getDataFromServer = (res: Response) => {
        res.json().then((services: TServices) => {
            if (services[0]) setServices(services)
        })
    }

    useEffect(() => {
        fetch('http://localhost:8080/all-services')
            .then(res => {
                if (res.status === 200) getDataFromServer(res)
            })
    })

    return (
        <div>
            <Header />
            <ServicesProvider servicesState={[services, setServices]}>
                <Services />
            </ServicesProvider>
        </div>
    )

}

export default Index