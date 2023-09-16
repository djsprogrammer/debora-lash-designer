import { useRef, useEffect } from 'react'
import anime from 'animejs'

import { formContainer } from 'commonStyles'

interface ContainerProps {
	children: React.ReactNode
}

const Container = ({ children }: ContainerProps) => {

	const container = useRef<HTMLDivElement>(null)

	useEffect(() => {

        if (container.current) {

	        anime({
	            targets: container.current,
	            scale: [0, 1],
	            duration: 100,
	            easing: 'easeOutQuad',
	            autoPlay: true
	        })

    	}

    }, [])

	return (
		<div ref={container} className={formContainer}>
			<div className='card border-light p-4 shadow form-bg'>
				{children}
			</div>
		</div>
	)
}

export default Container