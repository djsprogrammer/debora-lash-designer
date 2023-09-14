import { moneyFormat } from 'formFunctions/common'

import { ServiceSchedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

interface FinancialListProps {
    schedulings: ServiceSchedulings
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
        <ul className='mt-3'>
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