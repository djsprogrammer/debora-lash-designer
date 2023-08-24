import { useRef } from 'react'
import { formButtonStyle } from 'commonStyles'

const AddExpenseForm = () => {

	const dateRef = useRef<HTMLInputElement>(null)
	const nameRef = useRef<HTMLInputElement>(null)
	const valueRef = useRef<HTMLInputElement>(null)

	return (
		<form className='d-flex flex-column'>
			<div className='input-group'>
				<label className='input-group-text'>Escolha uma data</label>
				<input ref={dateRef} className='pe-1 form-control text-center' type='date' required />
			</div>
			<div className='input-group my-3'>
                <label className='input-group-text' htmlFor='services'>Nome</label>
                <input ref={nameRef} className='form-control text-center' type='text' required />
            </div>
            <div className='input-group mb-3'>
                <label className='input-group-text' htmlFor='services'>Valor</label>
                <input ref={valueRef} className='form-control text-center' type='text' required />
            </div>
			<button className={formButtonStyle} type='submit'>Registrar Despesa</button>
		</form>
	)

}

export default AddExpenseForm