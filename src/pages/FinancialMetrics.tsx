import { useContext, useState, useEffect } from 'react'

import { getCurrentMonth } from 'formFunctions/common'

import { Props } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialChart from 'components/financialMetrics/FinancialChart'
import FinancialList from 'components/financialMetrics/FinancialList'

import { DocsContext } from 'DocsContext'

interface FinancialMetricsProps extends Props {
    setNavDisplay: React.Dispatch<React.SetStateAction<string>>
}

const FinancialMetrics = ({ setNavDisplay, setCurrentPage }: FinancialMetricsProps) => {

    useEffect(() => {
        // Deixando a barra de navegação a mostra 
        // depois do carregamento do banco de dados
        setNavDisplay('d-flex')
    }, [setNavDisplay])

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    const filteredSchedulings = () => {
        return schedulings.filter(scheduling => {
            return scheduling.date.slice(0, 7) === financialFilter
        })
    }

    const filteredExpenses = () => {
        return expenses.filter(expense => {
            return expense.date.slice(0, 7) === financialFilter
        })
    }

    const getMonthRevenue = () => {
        return filteredSchedulings().reduce((acc, current) => {
            const values = current.service.value
            let sum = 0
            for (const value of values) {
                sum += value
            }
            return acc + sum
        }, 0)
    }

    const getMonthExpense = () => {
        return filteredExpenses().reduce((acc, current) => {
            return acc + current.value
        }, 0)
    }

    const getMonthProfit = () => {
        return getMonthRevenue() - getMonthExpense()
    }

    const getMonthProfitMargin = () => {
        return `${((getMonthProfit() / getMonthRevenue()) * 100).toFixed(1)} %`
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [setCurrentPage])

    return (
        <div className='container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <div className='mt-3 w-100'>
                <FinancialChart metrics={[getMonthRevenue(), getMonthExpense(), getMonthProfit()]} />
            </div>
            <FinancialList 
                filteredSchedulings={filteredSchedulings}
                filteredExpenses={filteredExpenses}
                getMonthRevenue={getMonthRevenue}
                getMonthExpense={getMonthExpense}
                getMonthProfit={getMonthProfit}
                getMonthProfitMargin={getMonthProfitMargin}
            />
        </div>
    )

}

export default FinancialMetrics