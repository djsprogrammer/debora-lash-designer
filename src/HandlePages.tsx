import Scheduling from 'pages/Scheduling'
import Loading from 'pages/Loading'

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
    return <Loading />
}

export default HandlePages