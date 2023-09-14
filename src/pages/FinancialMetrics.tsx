import { useContext, useState, useEffect } from 'react'

import { getCurrentMonth, moneyFormat } from 'formFunctions/common'

import { Props as FinancialMetricsProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialChart from 'components/financialMetrics/FinancialChart'

import { DocsContext } from 'DocsContext'

const FinancialMetrics = ({ setCurrentPage }: FinancialMetricsProps) => {

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    const filteredShedulings = () => {
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
        return filteredShedulings().reduce((acc, current) => {
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
        setCurrentPage(1)
    }, [setCurrentPage])

    return (
        <div className='container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <div className='mt-3 w-100'>
                <FinancialChart metrics={[getMonthRevenue(), getMonthExpense(), getMonthProfit()]} />
                <ul className='mt-3'>
                    <li><strong>Receita:</strong> {filteredShedulings()[0] ? moneyFormat(getMonthRevenue()) : null}</li>
                    <li><strong>Despesa:</strong> {filteredExpenses()[0] ? moneyFormat(getMonthExpense()) : null}</li>
                    <li><strong>Lucro:</strong> {filteredShedulings()[0] ? moneyFormat(getMonthProfit()) : null}</li>
                    <li><strong>Margem de Lucro:</strong> {filteredShedulings()[0] ? getMonthProfitMargin() : null}</li>
                </ul>
            </div>
        </div>
    )

}

export default FinancialMetrics