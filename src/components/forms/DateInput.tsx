interface DateInputProps {
    setDate: React.Dispatch<React.SetStateAction<string>>
}

const DateInput = ({ setDate }: DateInputProps) => {

    return (
        <div className='input-group'>
            <label className='input-group-text'>Escolha uma data</label>
            <input onChange={e => setDate(e.target.value)} className='pe-1 form-control text-center' type='date' required />
        </div>
    )

}

export default DateInput