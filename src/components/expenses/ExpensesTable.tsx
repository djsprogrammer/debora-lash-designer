import { tableStyle } from 'commonStyles'
import { Expenses } from 'types/expenses'
import ExpenseRow from './ExpenseRow'

interface Props {
    expenses: Expenses
}

const ExpensesTable = ({ expenses }: Props) => {

    return (
        <div className='table-container mb-4'>
            <table className={tableStyle}>
                <thead className='table-dark'>
                    <tr>
                        <th>Despesa</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => <ExpenseRow expense={expense} />)}
                </tbody>
            </table>
        </div>
    )
    
}

export default ExpensesTable