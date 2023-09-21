interface MonthInputProps {
    setTargetFilter: React.Dispatch<React.SetStateAction<string>>
}

const MonthInput = ({ setTargetFilter }: MonthInputProps) => {

    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ]

    const setFilter = (month: string) => {
        let monthIndex
        months.forEach((current, index) => {
            if (month === current) monthIndex = index
        })
        const date = `${new Date().getFullYear()}-${String(Number(monthIndex) + 1).padStart(2, '0')}`
        setTargetFilter(date)
    }

    return (
        <select defaultValue={months[new Date().getMonth()]} onChange={e => setFilter(e.target.value)} className='text-center form-select w-25'>
            {months.map((month) => <option key={month} value={month}>{month}</option>)}
        </select>
    )

}

export default MonthInput