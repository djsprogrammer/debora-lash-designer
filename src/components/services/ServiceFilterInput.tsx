import categories from 'constants/servicesCategory'

const ServiceFilterInput = () => {

	return (
		<select className='mt-2 text-center form-select w-25'>
            {categories.map(category => {
                return <option key={category}>{category}</option>
            })}
        </select>
	)
}

export default ServiceFilterInput