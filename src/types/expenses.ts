export interface Expense {
	date: string
	name: string
	value: number
}

export type Expenses = Expense[]

export type SetExpense = React.Dispatch<React.SetStateAction<Expense>>
export type SetExpenses = React.Dispatch<React.SetStateAction<Expenses>>

export type ExpensesState = [Expenses, SetExpenses]