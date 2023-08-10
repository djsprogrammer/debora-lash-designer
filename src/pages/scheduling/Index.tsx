import { useEffect } from 'react'

interface Props {
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Index = ({ setCurrentPage }: Props) => {

	useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

	return (
		<div>
			<h1>Hello World</h1>
		</div>
	)
	
}

export default Index