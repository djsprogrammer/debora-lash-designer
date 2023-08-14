interface Props {
	setCurrentMonth: React.Dispatch<React.SetStateAction<number>>
}

const Index = ({ setCurrentMonth }: Props) => {

	const months = [
		{ value: 0, label: 'Janeiro' },
		{ value: 1, label: 'Fevereiro' },
		{ value: 2, label: 'Março' },
		{ value: 3, label: 'Abril' },
		{ value: 4, label: 'Maio' },
		{ value: 5, label: 'Junho' },
		{ value: 6, label: 'Julho' },
		{ value: 7, label: 'Agosto' },
		{ value: 8, label: 'Setembro' },
		{ value: 9, label: 'Outubro' },
		{ value: 10, label: 'Novembro' },
		{ value: 11, label: 'Dezembro' }
	]

	const currentMonth = new Date().getMonth()

	return (
		<div style={{width: '300px'}} className='input-group my-3'>
			<label className='input-group-text'>Escolha o mês</label>
			<select onChange={e => setCurrentMonth(Number(e.target.value))} className='form-select text-center'>
				{months.map(month => {
					return (
						<option value={month.value} selected={currentMonth === month.value}>{month.label}</option>
					)
				})}
			</select>
		</div>
	)

}

export default Index