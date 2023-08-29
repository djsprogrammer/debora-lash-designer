interface LoadingPageProps {
	loadingDatabaseText: string
}

const LoadingPage = ({ loadingDatabaseText }: LoadingPageProps) => {

	return (
		<div className='position-absolute vw-100 vh-100 top-0 start-0 d-flex justify-content-center align-items-center'>
			<h4>{loadingDatabaseText}</h4>
		</div>
	)

}

export default LoadingPage