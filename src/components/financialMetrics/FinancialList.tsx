import { moneyFormat } from 'formFunctions/common'

import { ServiceSchedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

interface FinancialListProps {
    filteredSchedulings: () => ServiceSchedulings
    filteredExpenses: () => Expenses
    getMonthRevenue: () => number
    getMonthExpense: () => number
    getMonthProfit: () => number
    getMonthProfitMargin: () => string
}

const FinancialList = (props: FinancialListProps) => {

    const { 
        filteredSchedulings, 
        filteredExpenses,
        getMonthRevenue,
        getMonthExpense,
        getMonthProfit,
        getMonthProfitMargin
    } = props

    return (
        <ul className='mt-3'>
            <li>
                <strong>Receita:</strong> {
                filteredSchedulings()[0] 
                ? moneyFormat(getMonthRevenue()) 
                : null}
            </li>
            <li>
                <strong>Despesa:</strong> {
                filteredExpenses()[0] 
                ? moneyFormat(getMonthExpense()) 
                : null}
            </li>
            <li>
                <strong>Lucro:</strong> {
                filteredSchedulings()[0] 
                ? moneyFormat(getMonthProfit()) 
                : null}
            </li>
            <li>
                <strong>Margem de Lucro:</strong> {
                filteredSchedulings()[0] 
                ? getMonthProfitMargin() 
                : null}
            </li>
        </ul>
    )
}

export default FinancialList