let nameInput: Input
let valueInput: Input
let button: React.RefObject<HTMLButtonElement>

export const saveReferenciesOnMemory = (targetNameInput: Input, targetValueInput: Input, targetButton: React.RefObject<HTMLButtonElement>) => {
    nameInput = targetNameInput
    valueInput = targetValueInput
    button = targetButton
}

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

export const inputsValues = (nameInput: Input, valueInput: Input) => {
    let name = ''
    let value = ''
    if (nameInput.current && valueInput.current) {
        name = nameInput.current.value
        value = valueInput.current.value
    }
    return [name, value]
}

export const setButtonText = (button: React.RefObject<HTMLButtonElement>, text: string) => {
    if (button.current) {
        button.current.innerText = text
    }
}

export const changeFormState = (buttonText: string) => {
    if (nameInput.current && valueInput.current) {
        nameInput.current.value = ''
        valueInput.current.value = ''
    }
    if (button.current) {
        button.current.innerText = buttonText
    }
}