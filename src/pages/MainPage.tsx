import Scheduling from 'pages/Scheduling'
import Loading from 'pages/Loading'

interface MainPageProps {
	databaseLoaded: boolean
	setNavDisplay: React.Dispatch<React.SetStateAction<string>>
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const MainPage = ({ databaseLoaded, setNavDisplay, setCurrentPage }: MainPageProps) => {
	if (databaseLoaded) {
        return <Scheduling 
            setNavDisplay={setNavDisplay}
            setCurrentPage={setCurrentPage} 
        />
    } else {
        return <Loading />
    }
}

export default MainPage