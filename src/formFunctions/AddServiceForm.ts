export const validNumber = (value: string) => {
    const regex = /^[0-9.]+$/
        if (regex.test(value)) {
            return true
        } else {
            return false
        }
}

type Input = React.RefObject<HTMLInputElement>

export const defaultInputValue = (nameInput: Input, valueInput: Input) => {
    if (nameInput.current && valueInput.current) {
        nameInput.current.value = ''
        valueInput.current.value = ''
    }
}