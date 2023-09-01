import { Services } from 'types/services'
import { ServiceSchedulings } from 'types/schedulings'
import { Expenses } from 'types/expenses'

export interface AllDocs {
	services: Services
	schedulings: ServiceSchedulings
	expenses: Expenses
}