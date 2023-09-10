import { useEffect } from 'react'

import categories from 'constants/servicesCategory'

interface SelectCategoryInputProps {
    setFirstCategoryOption: (firstCategory: string) => void
    setCategory: React.Dispatch<React.SetStateAction<string>>
}

const SelectCategoryInput = ({ setFirstCategoryOption, setCategory }: SelectCategoryInputProps) => {

    const formCategories = categories.slice(1)

    const firstCategory = formCategories[0]

    // Setando a primeira opção caso o usuário não mude
    useEffect(() => {
        setFirstCategoryOption(firstCategory)
    }, [setFirstCategoryOption, firstCategory])

    return (
        <div className='input-group mb-3'>
            <label className='input-group-text'>Categoria</label>
            <select onChange={e => setCategory(e.target.value)} className='form-select text-center' required>
                {formCategories.map(category => {
                    return <option key={category}>{category}</option>
                })}
            </select>
        </div>
    )

}

export default SelectCategoryInput