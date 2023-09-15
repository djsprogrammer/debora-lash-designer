import { useEffect, useContext, useState } from 'react'

import { getCurrentMonth } from 'formFunctions/common'
import { filteredExpenses, filteredSchedulings } from 'formFunctions/financial/common'

import { Props as FinancialMetricsProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialIncome from 'components/financialMetrics/FinancialIncome/FinancialIncome'

import { DocsContext } from 'DocsContext'

const FinancialMetrics = ({ setCurrentPage }: FinancialMetricsProps) => {

    useEffect(() => {
        setCurrentPage(0)
    }, [setCurrentPage])

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    /* const getMostOfferServices = () => {
        const servicesArrays = filteredSchedulings(schedulings, financialFilter).map(scheduling => {
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
    } */

    return (
        <div className='mt-4 container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <FinancialIncome
                schedulings={filteredSchedulings(schedulings, financialFilter)}
                expenses={filteredExpenses(expenses, financialFilter)}
            />
            {/*<ServicesChart services={getMostOfferServices()} />*/}
        </div>
    )

}

export default FinancialMetrics