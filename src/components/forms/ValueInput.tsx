interface ValueInputProps {
	margin?: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const ValueInput = ({ margin, setValue }: ValueInputProps) => {
	return (
		<div className={`${margin} input-group`}>
            <label className='input-group-text' htmlFor='services'>Valor</label>
            <input onChange={e => setValue(e.target.value)} className='form-control text-center' type='text' required />
        </div>
	)
}

export default ValueInput