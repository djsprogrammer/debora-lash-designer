import { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import NameInput from 'components/forms/NameInput'
import ValueInput from 'components/forms/ValueInput'
import AddFormButtons from 'components/pages/AddFormButtons'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { ExpensesState } from 'types/expenses'
import { BooleanSet } from 'types/common'
import { CREATE_EXPENSE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, INVALID_NUMBER_TEXT } from 'constants/errors'
import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import DateInput from 'components/forms/DateInput'

interface Props {
	setAddExpenseForm: BooleanSet
	expensesState: ExpensesState
}

const AddExpenseForm = ({ setAddExpenseForm, expensesState }: Props) => {

	const [expenses, setExpenses] = expensesState
	const [blockedActions, setBlockedActions] = useState(false)
	const [date, setDate] = useState('')
	const [name, setName] = useState('')
	const [value, setValue] = useState('')
	const [allInputsFilled, setAllInputsFilled] = useState(false)

	// Verificando se todos os inputs foram preenchidos
	// Pois caso não tenham sido, será impedido a mudança no comportamento do botão
	useEffect(() => {
		if (date && name && value) {
			setAllInputsFilled(true)
		}
	}, [date, name, value])

	const addExpense = () => {
		if (!blockedActions) {
			setBlockedActions(true)
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
					fetch(CREATE_EXPENSE, options)
						.then(res => {
							switch (res.status) {
								case 201:
									// Organizando novos agendamentos por datas
									const newExpenses = [...expenses, newExpense]
										.sort((a, b) => a.date.localeCompare(b.date)).reverse()
									setExpenses(newExpenses)
									break
								case 503: 
									alert(DATABASE_ERROR_TEXT)
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
		<Container>
			<FormHeader page='Despesa' />
			<div className='card-body'>
				<form className='d-flex flex-column' onSubmit={e => {
					e.preventDefault()
					addExpense()
				}}>
					<DateInput setDate={setDate} />
					<NameInput margin='my-3' setName={setName} />
		            <ValueInput margin='mb-3' setValue={setValue} />
		            <AddFormButtons
		            	allInputsFilled={allInputsFilled}
		            	blockedActions={blockedActions}
		            	setAddForm={setAddExpenseForm}
		            />
				</form>
			</div>
		</Container>
	)

}

export default AddExpenseForm