import { Services } from 'types/services'

interface ServicesOptionsInputProps {
    setOption: React.Dispatch<React.SetStateAction<string>>
    services: Services
    showSecondOption?: boolean
    margin?: string
}

const ServicesOptionsInput = ({ showSecondOption, margin, setOption, services }: ServicesOptionsInputProps) => {
    return (
        <div onMouseDown={e => {
            if (showSecondOption) e.preventDefault()
        }} className={`input-group ${margin}`}>
            <label className='input-group-text'>Escolha um serviço</label>
            <select onChange={e => setOption(e.target.value)} className='form-select text-center' required>
                {services.map(service => (
                    <option key={service._id} value={JSON.stringify(service)}>{service._id}</option>
                ))}
            </select>
        </div>
    )
}

export default ServicesOptionsInput