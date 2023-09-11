interface SchedulingFilterInputProps {
    setSchedulingFilter: React.Dispatch<React.SetStateAction<string>>
}

const SchedulingFilterInput = ({ setSchedulingFilter }: SchedulingFilterInputProps) => {

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

    return (
        <select className='mt-2 text-center form-select w-25'>
            {months.map((month, index) => {
                return <option key={index} value={index} selected={checkCurrentMonth(index)}>{month}</option>
            })}
        </select>
    )

}

export default SchedulingFilterInput