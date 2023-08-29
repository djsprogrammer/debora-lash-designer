import Scheduling from 'pages/Scheduling'
import LoadingPage from 'components/main/LoadingPage'

interface HandlePagesProps {
    databaseLoaded: boolean
    setNavDisplay: React.Dispatch<React.SetStateAction<string>>
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const HandlePages = ({ databaseLoaded, setNavDisplay, setCurrentPage }: HandlePagesProps) => {
    if (databaseLoaded) {
        // Deixando a barra de navegação visível
        setNavDisplay('d-flex')
        // Atual página padrão
        return <Scheduling setCurrentPage={setCurrentPage} />
    }
    return <LoadingPage />
}

export default HandlePages