import { useState, useEffect } from 'react'
import { Props } from 'types/pages'
import { Expenses as TExpenses } from 'types/expenses'
import { container } from 'commonStyles'
import ExpensesTable from 'components/expenses/ExpensesTable'
import AddExpenseForm from 'components/expenses/AddExpenseForm'
import AnyExpensesAdvice from 'components/pages/AnyAdvice'
import RegisterButton from 'components/pages/RegisterButton'
import { GET_EXPENSES } from 'constants/urls'

export const BACKEND_EXPENSES = 'backend-expenses'

const Expenses = ({ setCurrentPage }: Props) => {

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	const cacheExpenses = localStorage.getItem(BACKEND_EXPENSES)

	const getExpensesFromCache = () => {
		// Iniciando o state com as expenses em cache da sessão
		if (cacheExpenses) {
			return JSON.parse(cacheExpenses)
		} else {
			return []
		}
	}

	const [expenses, setExpenses] = useState<TExpenses>(getExpensesFromCache)
	const [addExpenseForm, setAddExpenseForm] = useState(false)

	useEffect(() => {
		// Verificando se já existe as expenses em cache
		if (!cacheExpenses) {
			fetch(GET_EXPENSES)
				.then(res => res.json())
				.then((expenses: TExpenses) => {
					const orderExpenses = expenses.sort((a, b) => a.date.localeCompare(b.date)).reverse()
					setExpenses(orderExpenses)
					// Salvando em cache para futuras renderizações na mesma sessão
					localStorage.setItem(BACKEND_EXPENSES, JSON.stringify(orderExpenses))
				})
		}
	}, [cacheExpenses])

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