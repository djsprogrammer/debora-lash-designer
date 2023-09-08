const SelectCategoryInput = () => {

    return (
        <div className='input-group mb-3'>
            <label className='input-group-text'>Categoria</label>
            <select className='form-select text-center' required>
                <option>Categoria 1</option>
                <option>Categoria 2</option>
                <option>Categoria 3</option>
            </select>
        </div>
    )

}

export default SelectCategoryInput