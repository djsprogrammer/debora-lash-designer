interface SchedulingFilterInputProps {
    setSchedulingFilter: React.Dispatch<React.SetStateAction<string>>
}

const SchedulingFilterInput = ({ setSchedulingFilter }: SchedulingFilterInputProps) => {

    const months = [
        ['01', 'Janeiro'],
        ['02', 'Fevereiro'],
        ['03', 'Março'],
        ['04', 'Abril'],
        ['05', 'Maio'],
        ['06', 'Junho'],
        ['07', 'Julho'],
        ['08', 'Agosto'],
        ['09', 'Setembro'],
        ['10', 'Outubro'],
        ['11', 'Novembro'],
        ['12', 'Dezembro']
    ]

    return (
        <select className='mt-2 text-center form-select w-25'>
            {months.map(month => {
                return <option key={month[0]} value={month[0]}>{month[1]}</option>
            })}
        </select>
    )

}

export default SchedulingFilterInput