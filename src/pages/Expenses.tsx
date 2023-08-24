import { useEffect } from 'react'
import { Props } from 'types/pages'

const Expenses = ({ setCurrentPage }: Props) => {

	useEffect(() => {
		setCurrentPage(2)
	}, [setCurrentPage])

	return (
		<h1>Página de despesas</h1>
	)
}

export default Expenses