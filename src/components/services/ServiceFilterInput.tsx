import categories from 'constants/servicesCategory'

interface ServiceFilterInputProps {
    setServiceFilter: React.Dispatch<React.SetStateAction<string>>
}

const ServiceFilterInput = ({ setServiceFilter }: ServiceFilterInputProps) => {

    const setFilter = (value: string) => {
        if (value === 'Todos') {
            setServiceFilter('')
        } else {
            setServiceFilter(value)
        }
    }

	return (
		<select onChange={e => setFilter(e.target.value)} className='text-center form-select w-25'>
            {categories.map(category => {
                return <option key={category}>{category}</option>
            })}
        </select>
	)
}

export default ServiceFilterInput