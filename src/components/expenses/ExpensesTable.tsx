import { useState } from 'react'
import { tableStyle } from 'commonStyles'
import { Expense, ExpensesState } from 'types/expenses'
import ExpenseRow from './ExpenseRow'
import DeleteForm from 'components/pages/DeleteForm'
import { fetchOptions } from 'formFunctions/common'
import { DELETE_EXPENSE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT } from 'constants/errors'
import { BACKEND_EXPENSES } from 'pages/Expenses'

interface Props {
    expensesState: ExpensesState
}

const ExpensesTable = ({ expensesState }: Props) => {

    const [expenses, setExpenses] = expensesState

    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [targetExpense, setTargetExpense] = useState<Expense>({} as Expense)

    const deleteExpense = () => {
        const options = fetchOptions('delete', targetExpense)
        fetch(DELETE_EXPENSE, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingExpenses = expenses.filter(expense => {
                            return expense._id !== targetExpense._id
                        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
                        setExpenses(remainingExpenses)
                        // Salvando em cache
                        localStorage.setItem(BACKEND_EXPENSES, JSON.stringify(remainingExpenses))
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
                        setTargetExpense={setTargetExpense} 
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