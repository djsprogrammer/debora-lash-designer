import { useContext, useState } from 'react'

import { deleteFetchOptions, getCurrentMonth } from 'formFunctions/common'
import { DELETE_EXPENSE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
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
        const options = deleteFetchOptions(targetId)
        fetch(DELETE_EXPENSE, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingExpenses = expenses.filter(expense => {
                            return expense._id !== targetId
                        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
                        setExpenses(remainingExpenses)
                        break
                    case 503:                        
                        setTimeout(() => {
                            alert(DATABASE_ERROR_TEXT)
                        }, 100)
                        break
                }
                setDeleteExpenseForm(false)
            }).catch(() => {
                setDeleteExpenseForm(false)
                setTimeout(() => {
                    alert(SERVER_ERROR_TEXT)
                }, 100)
            })
    }

    return (
        <div className='table-container mb-3'>
            <MonthInput 
                setTargetFilter={setExpenseFilter}
            />
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