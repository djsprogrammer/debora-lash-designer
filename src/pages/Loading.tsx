import { Loader2 } from 'lucide-react'

const LoadingPage = () => {

	return (
		<div style={{ zIndex: 1 }} className='position-absolute vw-100 vh-100 top-0 start-0 bg-white d-flex justify-content-center align-items-center'>
			<Loader2 className='loader' size={50} />
		</div>
	)

}

export default LoadingPage