interface HeaderProps {
    text: string
}

const Header = ({ text }: HeaderProps) => {
    return (
        <div className='card-header mb-2'>
            <h5>{text}</h5>
        </div>
    )
}

export default Header