import { useState, useEffect } from 'react'
import { Props } from 'types/pages'
import { Expenses as TExpenses } from 'types/expenses'
import { container } from 'commonStyles'
import AddExpenseForm from 'components/expenses/AddExpenseForm'

const Expenses = ({ setCurrentPage }: Props) => {

	const [expenses, setExpenses] = useState<TExpenses>([])

	useEffect(() => {
		console.log(expenses)
	}, [expenses])

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	return (
		<div className={container}>
			<AddExpenseForm expensesState={[expenses, setExpenses]} />
		</div>
	)
}

export default Expenses