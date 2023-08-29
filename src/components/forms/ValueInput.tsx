interface ValueInputProps {
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const ValueInput = ({ setValue }: ValueInputProps) => {
	return (
		<div className='input-group my-3'>
            <label className='input-group-text' htmlFor='services'>Valor</label>
            <input onChange={e => setValue(e.target.value)} className='form-control text-center' type='text' required />
        </div>
	)
}

export default ValueInput