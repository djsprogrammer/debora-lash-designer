import { Schedulings } from 'types/schedulings'

import ServicesChart from './ServicesChart'
import MoreIncomeServices from './MoreIncomeServices'

interface ServicesInfoProps {
    schedulings: Schedulings
    setShowOfferedServices: React.Dispatch<React.SetStateAction<boolean>>
}

const ServicesInfo = ({ schedulings, setShowOfferedServices }: ServicesInfoProps) => {

    const getMostOfferedServices = () => {
        const servicesArrays = schedulings.map(scheduling => {
            return scheduling.service.name
        }).flat()
        const services: [string, number][] = Array.from(new Set(servicesArrays))
            .map(service => [service, 0])
        servicesArrays.forEach(current => {
            for (const service of services) {
                if (current === service[0]) {
                    service[1] += 1
                }
            }
        })
        return services
    }

    const getMoreIncomeServices = () => {

        // Obtendo os services prestados no mês
        const servicesArrays = schedulings.map(scheduling => {
            return scheduling.service.name
        }).flat()

        // Array dos dados da função
        const services: [string, number][] = Array.from(new Set(servicesArrays))
            .map(service => [service, 0])

        // Criação do formato que será utilizado para incrementar os valores
        const newFormat: [string[], number[]][] = schedulings.map(scheduling => {
            return [scheduling.service.name, scheduling.service.value]
        })

        // Incrementando os valores rendidos de cada serviço
        newFormat.forEach(current => {
            current[0].forEach((serviceName, index) => {
                for (const service of services) {
                    if (serviceName === service[0]) {
                        service[1] += current[1][index]
                    }
                }
            })
        })

        return services.sort((a, b) => {
            return b[1] - a[1]
        })

    }

    return (
        <div className='w-100'>
            <ServicesChart services={getMostOfferedServices()} />
            <div className='mb-3 d-flex justify-content-between'>
                <MoreIncomeServices services={getMoreIncomeServices()} />
                <button onClick={() => setShowOfferedServices(false)} className='align-self-end btn btn-sm btn-primary'>Rendimentos</button>
            </div>
        </div>
    )

}

export default ServicesInfo