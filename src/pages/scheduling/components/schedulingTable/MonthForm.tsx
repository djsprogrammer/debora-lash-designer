const Index = () => {

	return (
		<div style={{width: '300px'}} className='input-group my-3'>
			<label className='input-group-text'>Escolha o mês</label>
			<select className='form-select text-center' required>
				<option value='january'>Janeiro</option>
				<option value='february'>Fevereiro</option>
				<option value='march'>Março</option>
				<option value='april'>Abril</option>
				<option value='may'>Maio</option>
				<option value='june'>Junho</option>
				<option value='july'>Julho</option>
				<option value='august'>Agosto</option>
				<option value='september'>Setembro</option>
				<option value='october'>Outubro</option>
				<option value='november'>Novembro</option>
				<option value='december'>Dezembro</option>
			</select>
		</div>
	)

}

export default Index