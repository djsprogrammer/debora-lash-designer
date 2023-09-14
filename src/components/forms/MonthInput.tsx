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

    const checkCurrentMonth = (index: number) => {
        return index === new Date().getMonth()
        ? true : false
    }

    const setFilter = (value: string) => {
        const date = `${new Date().getFullYear()}-${String(Number(value) + 1).padStart(2, '0')}`
        setTargetFilter(date)
    }

    return (
        <select onChange={e => setFilter(e.target.value)} className='text-center form-select w-25'>
            {months.map((month, index) => {
                return <option key={index} value={index} selected={checkCurrentMonth(index)}>{month}</option>
            })}
        </select>
    )

}

export default MonthInput