import Navegation from './Navegation'

interface HeaderProps {
    currentPage: number
}

const Header = ({ currentPage }: HeaderProps) => {

    return (
        <header className='text-bg-dark py-1 px-2 d-flex justify-content-between'>
            <h5 className='logo pt-1'>Débora Bento</h5>
            <Navegation currentPage={currentPage} />
        </header>
    )

}

export default Header