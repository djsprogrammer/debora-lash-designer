import { useEffect } from 'react'

interface SelectCategoryInputProps {
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

const SelectCategoryInput = ({ setCategory }: SelectCategoryInputProps) => {

    const categories = [
        'Colocação de Cílios', 
        'Manutenção de Cílios', 
        'Remoção de Cílios', 
        'Sobrancelha'
    ]

    // Setando a primeira opção caso o usuário não mude
    useEffect(() => {
        setCategory(categories[0])
    }, [])

    return (
        <div className='input-group mb-3'>
            <label className='input-group-text'>Categoria</label>
            <select onChange={e => setCategory(e.target.value)} className='form-select text-center' required>
                {categories.map(category => {
                    return <option key={category}>{category}</option>
                })}
            </select>
        </div>
    )

}

export default SelectCategoryInput