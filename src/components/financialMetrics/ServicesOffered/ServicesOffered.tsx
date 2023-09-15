import { ServiceSchedulings } from 'types/schedulings'

import ServicesChart from './ServicesChart'

interface ServicesOfferedProps {
    schedulings: ServiceSchedulings
}

const ServicesOffered = ({ schedulings }: ServicesOfferedProps) => {

    const getMostOfferServices = () => {
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

    return (
        <div className='w-100'>
            <ServicesChart services={getMostOfferServices()} />
        </div>
    )

}

export default ServicesOffered