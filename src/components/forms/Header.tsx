interface HeaderProps {
    page: string
}

const Header = ({ page }: HeaderProps) => {
    return (
        <div className='card-header mb-2'>
            <h5>Registrar {page}</h5>
        </div>
    )
}

export default Header