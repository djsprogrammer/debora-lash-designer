import { Schedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

export const filteredSchedulings = (schedulings: Schedulings, financialFilter: string) => {
    return schedulings.filter(scheduling => {
        return scheduling.date.slice(0, 7) === financialFilter
    })
}

export const filteredExpenses = (expenses: Expenses, financialFilter: string) => {
    return expenses.filter(expense => {
        return expense.date.slice(0, 7) === financialFilter
    })
}