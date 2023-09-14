import { useContext, useState, useEffect } from 'react'

import { getCurrentMonth } from 'formFunctions/common'

import { Props } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialChart from 'components/financialMetrics/FinancialChart'
import FinancialList from 'components/financialMetrics/FinancialList'

import { DocsContext } from 'DocsContext'
import { filteredExpenses, filteredSchedulings } from 'formFunctions/financial/common'

interface FinancialMetricsProps extends Props {
    setNavDisplay: React.Dispatch<React.SetStateAction<string>>
}

const FinancialMetrics = ({ setNavDisplay, setCurrentPage }: FinancialMetricsProps) => {

    useEffect(() => {
        // Deixando a barra de navegação a mostra 
        // depois do carregamento do banco de dados
        setNavDisplay('d-flex')
    }, [setNavDisplay])

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

    return (
        <div className='container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <div className='mt-3 w-100'>
                <FinancialChart metrics={[getMonthRevenue(), getMonthExpense(), getMonthProfit()]} />
            </div>
            <FinancialList 
                schedulings={filteredSchedulings(schedulings, financialFilter)}
                expenses={filteredExpenses(expenses, financialFilter)}
                revenue={getMonthRevenue()}
                expense={getMonthExpense()}
                profit={getMonthProfit()}
                profitMargin={getMonthProfitMargin()}
            />
        </div>
    )

}

export default FinancialMetrics