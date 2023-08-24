import { formButtonStyle } from 'commonStyles'

const AddExpenseForm = () => {
	return (
		<form className='d-flex flex-column'>
			<div className='input-group'>
				<label className='input-group-text'>Escolha uma data</label>
				<input className='pe-1 form-control text-center' type='date' required />
			</div>
			<input className='form-control text-center p-1 my-3' type='text' placeholder='Digite o nome da despesa' required />
			<button className={formButtonStyle} type='submit'>Registrar Despesa</button>
		</form>
	)
}

export default AddExpenseForm