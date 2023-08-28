import { useState, useRef, useEffect } from 'react'
import { v4 } from 'uuid'
import AddFormButtons from 'components/pages/AddFormButtons'
import { saveRefsInMemory, getExpenseInfo } from 'formFunctions/AddExpenseForm'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { formContainer, addFormCardStyle, addFormCardHeaderStyle } from 'commonStyles'
import { ExpensesState } from 'types/expenses'
import { BooleanSet } from 'types/common'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT, INVALID_NUMBER_TEXT } from 'errorAdvices'

interface Props {
	setAddExpenseForm: BooleanSet
	expensesState: ExpensesState
}

const AddExpenseForm = ({ setAddExpenseForm, expensesState }: Props) => {

	const [expenses, setExpenses] = expensesState
	const [blockedActions, setBlockedActions] = useState(false)

	const dateRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const valueRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		saveRefsInMemory(dateRef, nameRef, valueRef)
	}, [])

	const addExpense = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			const [date, name, value] = getExpenseInfo()
			if (validNumber(value)) {
				const newExpense = { _id: v4(), date, name, value: Number(value) }
				const alreadyExists = expenses.filter(expense => {
					return expense.name === newExpense.name && expense.date === newExpense.date
				})[0]
				if (alreadyExists) {
					alert('Já existe uma despesa igual a essa')
					setAddExpenseForm(false)
					setBlockedActions(false)
				} else {
					const options = fetchOptions('post', newExpense)
					fetch(`${SERVER_URL}/create-expense`, options)
						.then(res => {
							switch (res.status) {
								case 201:
									// Organizando novos agendamentos por datas
									const newExpenses = [...expenses, newExpense]
										.sort((a, b) => a.date.localeCompare(b.date)).reverse()
									setExpenses(newExpenses)
									break
								case 503: 
									alert(DB_ERROR_TEXT)
									break
							}
							setAddExpenseForm(false)
							setBlockedActions(false)
						})
				}
			} else {
				alert(INVALID_NUMBER_TEXT)
				setAddExpenseForm(false)
				setBlockedActions(false)
			}
		}
	}

	return (
		<div className={formContainer}>
			<div className={addFormCardStyle}>
				<div className={addFormCardHeaderStyle}>
					<h5>Registrar Despesa</h5>
				</div>
				<div className='card-body'>
					<form className='d-flex flex-column' onSubmit={e => {
						e.preventDefault()
						addExpense()
					}}>
						<div className='input-group'>
							<label className='input-group-text'>Escolha uma data</label>
							<input ref={dateRef} className='pe-1 form-control text-center' type='date' required />
						</div>
						<div className='input-group my-3'>
			                <label className='input-group-text' htmlFor='services'>Nome</label>
			                <input ref={nameRef} className='form-control text-center' type='text' required />
			            </div>
			            <div className='input-group mb-3'>
			                <label className='input-group-text' htmlFor='services'>Valor</label>
			                <input ref={valueRef} className='form-control text-center' type='text' required />
			            </div>
			            <AddFormButtons 
			            	confirmText='Registrar'
			            	blockedActions={blockedActions}
			            	setAddForm={setAddExpenseForm}
			            />
					</form>
				</div>
			</div>
		</div>
	)

}

export default AddExpenseForm