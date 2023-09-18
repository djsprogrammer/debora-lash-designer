import { moneyFormat } from 'formFunctions/common'

interface MoreIncomeServicesProps {
    services: [string, number][]
}

const MoreIncomeServices = ({ services }: MoreIncomeServicesProps) => {

    return (
        <ol className='mb-0'>
            {services.map(service => {
                return <li><strong>{service[0]}:</strong> {moneyFormat(service[1])}</li>
            })}
        </ol>
    )

}

export default MoreIncomeServices