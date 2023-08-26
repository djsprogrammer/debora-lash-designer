import { useState, useEffect } from 'react'
import { Props } from 'types/pages'
import { Expenses as TExpenses } from 'types/expenses'
import { container } from 'commonStyles'
import ExpensesTable from 'components/expenses/ExpensesTable'
import AddExpenseForm from 'components/expenses/AddExpenseForm'
import AnyExpensesAdvice from 'components/pages/AnyAdvice'
import { SERVER_URL } from 'App'

const Expenses = ({ setCurrentPage }: Props) => {

	const [expenses, setExpenses] = useState<TExpenses>([])
	const [formButton, setFormButton] = useState(true)

	useEffect(() => {
		fetch(`${SERVER_URL}/all-expenses`)
			.then(res => res.json())
			.then((expenses: TExpenses) => {
				const orderExpenses = expenses.sort((a, b) => a.date.localeCompare(b.date)).reverse()
				setExpenses(orderExpenses)
			})
	}, [])

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{
				expenses[0] 
	            	? <ExpensesTable expensesState={[expenses, setExpenses]} />
	            	: <AnyExpensesAdvice page='despesa' />
	        }
	        {
	        	formButton
	        		? <button onClick={() => setFormButton(false)} className='btn btn-sm btn-outline-dark align-self-start'>Adicionar</button>
	        		: <AddExpenseForm 
	        				setFormButton={setFormButton}
	        				expensesState={[expenses, setExpenses]}
	        			/> 
	        }
		</div>
	)
}

export default Expenses