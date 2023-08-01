export const validNumber = (value: string) => {
    const regex = /^[0-9.]+$/
        if (regex.test(value)) {
            return true
        } else {
            return false
        }
}

type Input = React.RefObject<HTMLInputElement>

export const setInputValue = (nameInput: Input, valueInput: Input, nameValue: string, valueValue: string) => {
    if (nameInput.current && valueInput.current) {
        nameInput.current.value = nameValue
        valueInput.current.value = valueValue
    }
}