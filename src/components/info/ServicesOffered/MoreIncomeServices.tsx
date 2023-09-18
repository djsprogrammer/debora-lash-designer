import { moneyFormat } from 'formFunctions/common'

interface MoreIncomeServicesProps {
    services: [string, number][]
}

const MoreIncomeServices = ({ services }: MoreIncomeServicesProps) => {

    return (
        <div>
            <h5 className='mb-2'>Serviços com maiores rendimentos:</h5>
            <ol className='mb-0'>
                {services.map(service => {
                    return <li className='ms-0'><strong>{service[0]}:</strong> {moneyFormat(service[1])}</li>
                })}
            </ol>
        </div>
    )

}

export default MoreIncomeServices