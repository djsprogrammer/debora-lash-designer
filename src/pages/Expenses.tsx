import { useEffect } from 'react'
import { Props } from 'types/pages'

const Expenses = ({ setCurrentPage }: Props) => {

	useEffect(() => {
		setCurrentPage(3)
	}, [setCurrentPage])

	return (
		<h1>Página de despesas</h1>
	)
}

export default Expenses