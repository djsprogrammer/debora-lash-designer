import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Main from './pages/main/Index'
import Services from './pages/services/Index'
import Header from './fixedComponents/Header'

const Index = () => {

    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/services' element={<Services />} />
                </Routes>
            </div>
        </Router>
    )

}

export default Index