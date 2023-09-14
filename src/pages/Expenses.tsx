import { useEffect, useContext, useState } from 'react'

import { container } from 'commonStyles'

import { Props as ExpensesProps } from 'types/pages'

import ExpensesTable from 'components/expenses/ExpensesTable'
import AnyExpensesAdvice from 'components/pages/AnyAdvice'
import AddExpenseForm from 'components/expenses/AddExpenseForm'
import RegisterButton from 'components/pages/RegisterButton'

import { DocsContext } from 'DocsContext'

const Expenses = ({ setCurrentPage }: ExpensesProps) => {

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	const [expenses] = useContext(DocsContext).expenses
	const [addExpenseForm, setAddExpenseForm] = useState(false)

	return (
		<div className={container}>
			{
				expenses[0] 
	            	? <ExpensesTable />
	            	: <AnyExpensesAdvice page='despesa' />
	        }
	        {
	        	addExpenseForm
	        		? <AddExpenseForm 
	        				setAddExpenseForm={setAddExpenseForm}
	        			/>
	        		: <RegisterButton setForm={setAddExpenseForm} text='Registrar' />
	        }
		</div>
	)
}

export default Expenses