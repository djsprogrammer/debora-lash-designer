import { useContext, useState, useEffect } from 'react'

import { getCurrentMonth } from 'formFunctions/common'

import { Props as FinancialMetricsProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialChart from 'components/financialMetrics/FinancialChart'
import ServicesChart from 'components/financialMetrics/ServicesChart'
import FinancialList from 'components/financialMetrics/FinancialList'

import { DocsContext } from 'DocsContext'
import { filteredExpenses, filteredSchedulings } from 'formFunctions/financial/common'

const FinancialMetrics = ({ setCurrentPage }: FinancialMetricsProps) => {

    useEffect(() => {
        setCurrentPage(0)
    }, [setCurrentPage])

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    const getMonthRevenue = () => {
        return filteredSchedulings(schedulings, financialFilter)
            .reduce((acc, current) => {
                const values = current.service.value
                let sum = 0
                for (const value of values) {
                    sum += value
                }
                return acc + sum
            }, 0)
    }

    const getMonthExpense = () => {
        return filteredExpenses(expenses, financialFilter)
            .reduce((acc, current) => {
                return acc + current.value
            }, 0)
    }

    const getMonthProfit = () => {
        return getMonthRevenue() - getMonthExpense()
    }

    const getMonthProfitMargin = () => {
        return `${Math.round(((getMonthProfit() / getMonthRevenue()) * 100))} %`
    }

    const getMostOfferServices = () => {
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
    }

    return (
        <div className='mt-4 container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <div className='mt-3 w-100 d-flex justify-content-around align-items-center'>
                <FinancialChart metrics={[getMonthRevenue(), getMonthExpense(), getMonthProfit()]} />
                <FinancialList 
                    schedulings={filteredSchedulings(schedulings, financialFilter)}
                    expenses={filteredExpenses(expenses, financialFilter)}
                    revenue={getMonthRevenue()}
                    expense={getMonthExpense()}
                    profit={getMonthProfit()}
                    profitMargin={getMonthProfitMargin()}
                />
            </div>
            <ServicesChart services={getMostOfferServices()} />
        </div>
    )

}

export default FinancialMetrics