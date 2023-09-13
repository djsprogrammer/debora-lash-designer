import { useContext, useState, useEffect } from 'react'

import { getCurrentMonth, moneyFormat } from 'formFunctions/common'

import { Props as FinancialMetricsProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'

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
            <ul className='mt-2 list-group'>
                <li className='list-group-item'>Receita: {filteredShedulings()[0] ? moneyFormat(getMonthRevenue()) : null}</li>
                <li className='list-group-item'>Despesa: {filteredExpenses()[0] ? moneyFormat(getMonthExpense()) : null}</li>
                <li className='list-group-item'>Lucro: {filteredShedulings()[0] ? moneyFormat(getMonthProfit()) : null}</li>
                <li className='list-group-item'>Margem de Lucro: {filteredShedulings()[0] ? getMonthProfitMargin() : null}</li>
            </ul>
        </div>
    )

}

export default FinancialMetrics