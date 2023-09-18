import { ServiceSchedulings } from 'types/schedulings'

import ServicesChart from './ServicesChart'

interface OfferedServicesProps {
    schedulings: ServiceSchedulings
    setShowServicesOffered: React.Dispatch<React.SetStateAction<boolean>>
}

const OfferedServices = ({ schedulings, setShowServicesOffered }: OfferedServicesProps) => {

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
            <button onClick={() => setShowServicesOffered(false)} className='btn btn-sm btn-primary'>Rendimentos</button>
        </div>
    )

}

export default OfferedServices