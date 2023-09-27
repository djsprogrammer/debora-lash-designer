import { Services } from 'types/services'
import { Schedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

export interface AllDocs {
	services: Services
	schedulings: Schedulings
	expenses: Expenses
}