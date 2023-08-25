import { useState, useEffect } from 'react'
import { Props } from 'types/pages'
import { Expenses as TExpenses } from 'types/expenses'
import { container } from 'commonStyles'
import ExpensesTable from 'components/expenses/ExpensesTable'
import AddExpenseForm from 'components/expenses/AddExpenseForm'
import AnyExpensesAdvice from 'components/pages/AnyAdvice'

const Expenses = ({ setCurrentPage }: Props) => {

	const [expenses, setExpenses] = useState<TExpenses>([])

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	return (
		<div className={container}>
			{expenses[0] 
	            ? <ExpensesTable expenses={expenses} /> 
	            : <AnyExpensesAdvice page='despesa' />}
			<AddExpenseForm expensesState={[expenses, setExpenses]} />
		</div>
	)
}

export default Expenses