import { useEffect } from 'react'

interface SelectCategoryInputProps {
    setFirstCategoryOption: (firstCategory: string) => void
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

const SelectCategoryInput = ({ setFirstCategoryOption, setCategory }: SelectCategoryInputProps) => {

    const categories = [
        'Colocação de Cílios', 
        'Manutenção de Cílios', 
        'Remoção de Cílios', 
        'Sobrancelha'
    ]

    const firstCategory = categories[0]

    // Setando a primeira opção caso o usuário não mude
    useEffect(() => {
        setFirstCategoryOption(firstCategory)
    }, [setFirstCategoryOption, firstCategory])

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