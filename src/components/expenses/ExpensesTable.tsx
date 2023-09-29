import { useContext, useState } from 'react'

import { getCurrentMonth } from 'formFunctions/common'
import { tableStyle } from 'commonStyles'

import MonthInput from 'components/forms/MonthInput'
import ExpenseRow from './ExpenseRow'
import DeleteForm from 'components/pages/DeleteForm'
import { DocsContext } from 'DocsContext'

const ExpensesTable = () => {

    const [expenses, setExpenses] = useContext(DocsContext).expenses

    const [expenseFilter, setExpenseFilter] = useState(getCurrentMonth())
    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [targetId, setTargetId] = useState('')

    const filteredExpenses = () => {
        return expenses.filter(expense => {
            return expense.date.slice(0, 7) === expenseFilter
        })
    }

    const deleteExpense = () => {
        const remainingExpenses = expenses.filter(expense => {
            return expense._id !== targetId
        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
        setExpenses(remainingExpenses)
        setDeleteExpenseForm(false)

    }

    return (
        <div className='w-100'>
            <MonthInput 
                setTargetFilter={setExpenseFilter}
            />
            <div className='mt-1 mb-4 table-container'>
                <table className={tableStyle}>
                    <thead>
                        <tr>
                            <th>Despesa</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpenses().map(expense => <ExpenseRow
                            key={expense._id}
                            expense={expense} 
                            setTargetId={setTargetId} 
                            setDeleteExpenseForm={setDeleteExpenseForm} />)}
                    </tbody>
                </table>
            </div>
            {
                deleteExpenseForm
                ? <DeleteForm 
                        setDeleteForm={setDeleteExpenseForm} 
                        deleteTarget={deleteExpense}
                    />
                : null
            }
        </div>
    )
    
}

export default ExpensesTable