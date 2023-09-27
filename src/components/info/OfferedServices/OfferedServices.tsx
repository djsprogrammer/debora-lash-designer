import { Schedulings } from 'types/schedulings'

import ServicesInfo from './ServicesInfo'

interface OfferedServicesProps {
    schedulings: Schedulings
    setShowOfferedServices: React.Dispatch<React.SetStateAction<boolean>>
}

const OfferedServices = ({ schedulings, setShowOfferedServices }: OfferedServicesProps) => {

    const isThereServicesInfo = () => {
        const services = schedulings.map(scheduling => {
            return scheduling.service
        })
        if (services[0]) return true
        return false
    }

    return (
        <>
            {
                isThereServicesInfo()
                    ? <ServicesInfo
                        schedulings={schedulings}
                        setShowOfferedServices={setShowOfferedServices}
                    />
                    : <div className='alert alert-warning'>Este mês não possui serviço registrado</div>
            }
        </>
    )

}

export default OfferedServices