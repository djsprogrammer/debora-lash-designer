import { useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface NavegationProps {
	navDisplay: string
	currentPage: number
}

const Navegation = ({ navDisplay, currentPage }: NavegationProps) => {

	const link1 = useRef<HTMLAnchorElement>(null)
	const link2 = useRef<HTMLAnchorElement>(null)
	const link3 = useRef<HTMLAnchorElement>(null)
	const link4 = useRef<HTMLAnchorElement>(null)

	const getSelectedLink = useCallback((currentPage: number) => {
		const links = [link1, link2, link3, link4]
		return links.filter((link, index) => index === currentPage)[0].current
	}, [])

	const getUnselectedLinks = useCallback((currentPage: number) => {
		const links = [link1, link2, link3, link4]
		return links.filter((link, index) => index !== currentPage)
	}, [])

	useEffect(() => {
		const selectedLink = getSelectedLink(currentPage)
		const unselectedLinks = getUnselectedLinks(currentPage)
		if (selectedLink) {
			selectedLink.classList.add('link-underline-opacity-100')
			for (const link of unselectedLinks) {
				if (link.current) {
					link.current.classList.remove('link-underline-opacity-100')
				}
			}
		}
	}, [currentPage, getSelectedLink, getUnselectedLinks])

	const linkStyle = 'link-dark link-underline-opacity-50'

	return (
		<nav className={`${navDisplay} justify-content-center p-3`}>
			<Link ref={link1} className={`${linkStyle} me-4`} to='/'><h5>Financeiro</h5></Link>
			<Link ref={link2} className={linkStyle} to='/schedulings'><h5>Agendamento</h5></Link>
			<Link ref={link3} className={`${linkStyle} mx-4`} to='/expenses'><h5>Despesa</h5></Link>
			<Link ref={link4} className={linkStyle} to='/services'><h5>Serviço</h5></Link>
		</nav>
	)
	
}

export default Navegation