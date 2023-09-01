import { useState, useEffect } from 'react'
import { Props } from 'types/pages'
import { ExpensesState } from 'types/expenses'
import { container } from 'commonStyles'
import ExpensesTable from 'components/expenses/ExpensesTable'
import AddExpenseForm from 'components/expenses/AddExpenseForm'
import AnyExpensesAdvice from 'components/pages/AnyAdvice'
import RegisterButton from 'components/pages/RegisterButton'

interface ExpensesProps extends Props {
	expensesState: ExpensesState
}

const Expenses = ({ setCurrentPage, expensesState }: ExpensesProps) => {

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	const [expenses, setExpenses] = expensesState
	const [addExpenseForm, setAddExpenseForm] = useState(false)

	return (
		<div className={container}>
			{
				expenses[0] 
	            	? <ExpensesTable expensesState={[expenses, setExpenses]} />
	            	: <AnyExpensesAdvice page='despesa' />
	        }
	        {
	        	addExpenseForm
	        		? <AddExpenseForm 
	        				setAddExpenseForm={setAddExpenseForm}
	        				expensesState={[expenses, setExpenses]}
	        			/>
	        		: <RegisterButton setForm={setAddExpenseForm} text='Registrar' />
	        }
		</div>
	)
}

export default Expenses