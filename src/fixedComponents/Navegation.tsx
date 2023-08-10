import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	currentPage: number
}

const Index = ({ currentPage }: Props) => {

	const link1 = useRef<HTMLAnchorElement>(null)
	const link2 = useRef<HTMLAnchorElement>(null)

	const links = [link1, link2]

	useEffect(() => {
		if (currentPage !== 0) {
			const selectedLink = links.filter((link, index) => index === currentPage - 1)[0].current
			const unselectedLinks = links.filter((link, index) => index !== currentPage - 1)
			if (selectedLink) {
				selectedLink.classList.add('link-underline-opacity-100')
				for (const link of unselectedLinks) {
					if (link.current) {
						link.current.classList.remove('link-underline-opacity-100')
					}
				}
			}
		}
	}, [currentPage])

	const linkStyle = 'link-dark link-underline-opacity-50'

	return (
		<nav className='d-flex justify-content-center p-2'>
			<Link ref={link1} className={`${linkStyle} me-2`} to='/'><h5>Agendamento</h5></Link>
			<Link ref={link2} className={linkStyle} to='/services'><h5>Seus Serviços</h5></Link>
		</nav>
	)
	
}

export default Index