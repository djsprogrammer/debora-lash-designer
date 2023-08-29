import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	navDisplay: string
	currentPage: number
}

const Navegation = ({ navDisplay, currentPage }: Props) => {

	const link1 = useRef<HTMLAnchorElement>(null)
	const link2 = useRef<HTMLAnchorElement>(null)
	const link3 = useRef<HTMLAnchorElement>(null)

	const links = [link1, link2, link3]

	useEffect(() => {
		const selectedLink = links.filter((link, index) => index === currentPage)[0].current
		const unselectedLinks = links.filter((link, index) => index !== currentPage)
		if (selectedLink) {
			selectedLink.classList.add('link-underline-opacity-100')
			for (const link of unselectedLinks) {
				if (link.current) {
					link.current.classList.remove('link-underline-opacity-100')
				}
			}
		}
	}, [currentPage])

	const linkStyle = 'link-dark link-underline-opacity-50'

	return (
		<nav className={`${navDisplay} justify-content-center p-3`}>
			<Link ref={link1} className={linkStyle} to='/'><h5>Agendamentos</h5></Link>
			<Link ref={link2} className={`${linkStyle} mx-4`} to='/services'><h5>Serviços</h5></Link>
			<Link ref={link3} className={linkStyle} to='/expenses'><h5>Despesas</h5></Link>
		</nav>
	)
	
}

export default Navegation