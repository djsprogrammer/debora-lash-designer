interface NameInputProps {
	setName: React.Dispatch<React.SetStateAction<string>>
}

const NameInput = ({ setName }: NameInputProps) => {
	return (
		<div className='input-group'>
            <label className='input-group-text' htmlFor='services'>Nome</label>
            <input onChange={e => setName(e.target.value)} className='form-control text-center' type='text' required />
       	</div>
	)
}

export default NameInput