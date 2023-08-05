import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Services as TServices } from './types/services'
import Header from './fixedComponents/Header'
import Services from './services/Index'
import ServicesProvider from './ServicesContext'

const Index = () => {

    const [services, setServices] = useState<TServices>([])

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