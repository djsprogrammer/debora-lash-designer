export interface Expense {
	_id: string
	date: string
	name: string
	value: number
}

export type Expenses = Expense[]

export type SetExpense = React.Dispatch<React.SetStateAction<Expense>>
export type SetExpenses = React.Dispatch<React.SetStateAction<Expenses>>

export type ExpensesState = [Expenses, SetExpenses]

export const DEFAULT_EXPENSE: Expense = {
	_id: '',
	date: '',
	name: '',
	value: 0
}