import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Services as TServices } from './types/services'
import Services from './pages/services/Index'
import Header from './fixedComponents/Header'
import ServicesProvider from './ServicesContext'

const Index = () => {

    const [services, setServices] = useState<TServices>([])

    return (
        <Router>
            <div>
                <ServicesProvider servicesState={[services, setServices]}>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Services />} /> {/* Enquanto não faço o dashboard */}
                        <Route path='/services' element={<Services />} />
                    </Routes>
                </ServicesProvider>
            </div>
        </Router>
    )

}

export default Index