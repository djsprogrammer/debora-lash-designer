import { useState } from 'react'
import { tableStyle } from 'commonStyles'
import { Expense, ExpensesState } from 'types/expenses'
import ExpenseRow from './ExpenseRow'
import { ButtonRef } from 'types/common'
import DeleteExpenseForm from 'components/expenses/DeleteExpenseForm'
import { fetchOptions } from 'formFunctions/common'
import { DB_ERROR_TEXT, SERVER_ERROR_TEXT } from 'errorAdvices'
import { SERVER_URL } from 'App'

interface Props {
    expensesState: ExpensesState
}

const ExpensesTable = ({ expensesState }: Props) => {

    const [expenses, setExpenses] = expensesState

    const [deleteExpenseForm, setDeleteExpenseForm] = useState(false)
    const [targetExpense, setTargetExpense] = useState<Expense>({} as Expense)
    const [possibleToCancel, setPossibleToCancel] = useState(true)

    const deleteExpense = (buttonRef: ButtonRef) => {
        if (buttonRef.current) buttonRef.current.innerText = '...'
        console.log(targetExpense)
        setPossibleToCancel(false)
        const options = fetchOptions('delete', targetExpense)
        fetch(`${SERVER_URL}/delete-expense`, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingExpenses = expenses.filter(expense => {
                            return expense._id !== targetExpense._id
                        }).sort((a, b) => a.date.localeCompare(b.date)).reverse()
                        setExpenses(remainingExpenses)
                        break
                    case 503:                        
                        setTimeout(() => {
                            alert(DB_ERROR_TEXT)
                        }, 100)
                        break
                }
                setDeleteExpenseForm(false)
                setPossibleToCancel(true)
            }).catch(() => {
                setDeleteExpenseForm(false)
                setPossibleToCancel(true)
                setTimeout(() => {
                    alert(SERVER_ERROR_TEXT)
                }, 100)
            })
    }

    return (
        <div className='table-container mb-4'>
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
                        expense={expense} 
                        setTargetExpense={setTargetExpense} 
                        setDeleteExpenseForm={setDeleteExpenseForm} />)}
                </tbody>
            </table>
            {
                deleteExpenseForm
                ? <DeleteExpenseForm 
                        setDeleteExpenseForm={setDeleteExpenseForm} 
                        deleteExpense={deleteExpense}
                        possibleToCancel={possibleToCancel}
                    />
                : null
            }
        </div>
    )
    
}

export default ExpensesTable