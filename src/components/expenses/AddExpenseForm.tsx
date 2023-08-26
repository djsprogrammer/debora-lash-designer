import { useRef, useEffect } from 'react'
import { v4 } from 'uuid'
import { saveRefsInMemory, setButtonText, getExpenseInfo, resetForm } from 'formFunctions/AddExpenseForm'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { formButtonStyle, deleteButtonStyle } from 'commonStyles'
import { ExpensesState } from 'types/expenses'
import { SERVER_URL } from 'App'
import { DB_ERROR_TEXT, INVALID_NUMBER_TEXT } from 'errorAdvices'

interface Props {
	setFormButton: React.Dispatch<React.SetStateAction<boolean>>
	expensesState: ExpensesState
}

const AddExpenseForm = ({ setFormButton, expensesState }: Props) => {

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
			const newExpense = { _id: v4(), date, name, value: Number(value) }
			const alreadyExists = expenses.filter(expense => {
				return expense.name === newExpense.name && expense.date === newExpense.date
			})[0]
			if (alreadyExists) {
				alert('Já existe uma despesa igual a essa')
				resetForm()
				setFormButton(true)
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
						setFormButton(true)
					})
			}
		} else {
			alert(INVALID_NUMBER_TEXT)
			resetForm()
			setFormButton(true)
		}
	}

	return (
		<div className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center delete-form'>
			<div className='card p-4'>
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
						<button onClick={() => setFormButton(true)} className={deleteButtonStyle}>Cancelar</button>
					</div>
				</form>
			</div>
		</div>
	)

}

export default AddExpenseForm