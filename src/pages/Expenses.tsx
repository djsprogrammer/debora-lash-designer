import { useEffect } from 'react'
import { Props } from 'types/pages'
import { container } from 'commonStyles'
import AddExpenseForm from 'components/expenses/AddExpenseForm'

const Expenses = ({ setCurrentPage }: Props) => {

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	return (
		<div className={container}>
			<AddExpenseForm />
		</div>
	)
}

export default Expenses