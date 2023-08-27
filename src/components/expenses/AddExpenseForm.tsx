import { useState, useRef, useEffect } from 'react'
import { v4 } from 'uuid'
import { saveRefsInMemory, setButtonText, getExpenseInfo, resetForm } from 'formFunctions/AddExpenseForm'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { deleteButtonStyle } from 'commonStyles'
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
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		saveRefsInMemory(dateRef, nameRef, valueRef, buttonRef)
	}, [])

	const addExpense = () => {
		if (!blockedActions) {
			setBlockedActions(true)
			setButtonText('...')
			const [date, name, value] = getExpenseInfo()
			if (validNumber(value)) {
				const newExpense = { _id: v4(), date, name, value: Number(value) }
				const alreadyExists = expenses.filter(expense => {
					return expense.name === newExpense.name && expense.date === newExpense.date
				})[0]
				if (alreadyExists) {
					alert('Já existe uma despesa igual a essa')
					resetForm()
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
							resetForm()
							setAddExpenseForm(false)
							setBlockedActions(false)
						})
				}
			} else {
				alert(INVALID_NUMBER_TEXT)
				resetForm()
				setAddExpenseForm(false)
				setBlockedActions(false)
			}
		}
	}

	return (
		<div className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-start add-form'>
			<div className='card p-4 mt-5 border border-dark'>
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
		            <div className='text-center'>
						<button ref={buttonRef} className={'btn btn-sm btn-dark me-2'} type='submit'>Registrar</button>
						<button onClick={() => {
							// Só permitindo fechar o formulário quando não estiver ocorrendo alguma ação
							if (!blockedActions) setAddExpenseForm(false)
						}} className={deleteButtonStyle}>Cancelar</button>
					</div>
				</form>
			</div>
		</div>
	)

}

export default AddExpenseForm