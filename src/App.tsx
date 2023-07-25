import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import Services from './pages/Services'
import Header from './components/fixed/Header'

const App = () => {

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

export default App