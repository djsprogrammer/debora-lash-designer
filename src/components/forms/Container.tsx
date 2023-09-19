import { formContainer } from 'commonStyles'

interface ContainerProps {
	children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {

	return (
		<div className={formContainer}>
			<div className='card border-light p-4 shadow form-bg'>
				{children}
			</div>
		</div>
	)
}

export default Container