import { useState } from 'react'
import { tableStyle } from 'commonStyles'
import { ExpensesState } from 'types/expenses'
import ExpenseRow from './ExpenseRow'
import DeleteForm from 'components/pages/DeleteForm'
import { DELETE_EXPENSE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { deleteFetchOptions } from 'formFunctions/common'

interface Props {
    expensesState: ExpensesState
}

const ExpensesTable = ({ expensesState }: Props) => {

    const [expenses, setExpenses] = expensesState

    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [targetId, setTargetId] = useState('')

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
                    {expenses.map(expense => <ExpenseRow
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