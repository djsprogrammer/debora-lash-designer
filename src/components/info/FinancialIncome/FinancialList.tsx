import { moneyFormat } from 'formFunctions/common'

import { Schedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

interface FinancialListProps {
    schedulings: Schedulings
    expenses: Expenses
    revenue: number
    expense: number
    profit: number
    profitMargin: string
}

const FinancialList = (props: FinancialListProps) => {

    const { 
        schedulings, 
        expenses,
        revenue,
        expense,
        profit,
        profitMargin
    } = props

    return (
        <ul className='mb-0'>
            <li>
                <strong>Receita:</strong> {
                schedulings[0] 
                ? moneyFormat(revenue) 
                : null}
            </li>
            <li>
                <strong>Despesa:</strong> {
                expenses[0] 
                ? moneyFormat(expense) 
                : null}
            </li>
            <li>
                <strong>Lucro:</strong> {
                schedulings[0] 
                ? moneyFormat(profit) 
                : null}
            </li>
            <li>
                <strong>Margem de Lucro:</strong> {
                schedulings[0] 
                ? profitMargin
                : null}
            </li>
        </ul>
    )
}

export default FinancialList