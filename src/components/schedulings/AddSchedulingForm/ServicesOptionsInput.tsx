import { Services } from 'types/services'

interface ServicesOptionsInputProps {
    margin?: string
    setOption: React.Dispatch<React.SetStateAction<string>>
    services: Services
}

const ServicesOptionsInput = ({ margin, setOption, services }: ServicesOptionsInputProps) => {
    return (
        <div className={`input-group ${margin}`}>
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