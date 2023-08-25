import { useRef, useEffect } from 'react'
import { v4 } from 'uuid'
import { saveRefsInMemory, setButtonText, getExpenseInfo, resetForm } from 'formFunctions/AddExpenseForm'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { formButtonStyle } from 'commonStyles'
import { ExpensesState } from 'types/expenses'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT, INVALID_NUMBER_TEXT } from 'errorAdvices'

interface Props {
	expensesState: ExpensesState
}

const AddExpenseForm = ({ expensesState }: Props) => {

	const [expenses, setExpenses] = expensesState

	const dateRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const valueRef = useRef<HTMLInputElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		saveRefsInMemory(dateRef, nameRef, valueRef, buttonRef)
	}, [])

	const addExpense = () => {
		setButtonText('...')
		const [date, name, value] = getExpenseInfo()
		if (validNumber(value)) {
			const expense = { _id: v4(), date, name, value: Number(value) }
			const options = fetchOptions('post', expense)
			fetch(`${SERVER_URL}/create-expense`, options)
				.then(res => {
					switch (res.status) {
						case 201:
							// Organizando novos agendamentos por datas
							const newExpenses = [...expenses, expense]
								.sort((a, b) => a.date.localeCompare(b.date)).reverse()
							setExpenses(newExpenses)
							break
						case 503: 
							alert(DB_ERROR_TEXT)
							break
					}
					resetForm()
				})
		} else {
			alert(INVALID_NUMBER_TEXT)
			resetForm()
		}
	}

	return (
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
			<button ref={buttonRef} className={formButtonStyle} type='submit'>Registrar Despesa</button>
		</form>
	)

}

export default AddExpenseForm