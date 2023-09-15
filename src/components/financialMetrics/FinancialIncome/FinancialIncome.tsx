import { ServiceSchedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

import FinancialChart from './FinancialChart'
import FinancialList from './FinancialList'

interface FinancialIncomeProps {
    schedulings: ServiceSchedulings
    expenses: Expenses
}

const FinancialIncome = ({ schedulings, expenses }: FinancialIncomeProps) => {

    const getMonthRevenue = () => {
        return schedulings.reduce((acc, current) => {
            const values = current.service.value
            let sum = 0
            for (const value of values) {
                sum += value
            }
            return acc + sum
        }, 0)
    }

    const getMonthExpense = () => {
        return expenses.reduce((acc, current) => {
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
        <div className='w-100'>
            <FinancialChart metrics={[getMonthRevenue(), getMonthExpense(), getMonthProfit()]} />
            <div className='d-flex justify-content-between'>
                <FinancialList
                    schedulings={schedulings}
                    expenses={expenses}
                    revenue={getMonthRevenue()}
                    expense={getMonthExpense()}
                    profit={getMonthProfit()}
                    profitMargin={getMonthProfitMargin()}
                />
                <button className='align-self-end btn btn-link'>Serviços</button>
            </div>
        </div>
    )
}

export default FinancialIncome