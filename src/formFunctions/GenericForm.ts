import { Service, SetServices } from "../types/services"

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

export const inputsValues = () => {
    let name = ''
    let value = ''
    if (nameInput.current && valueInput.current) {
        name = nameInput.current.value
        value = valueInput.current.value
    }
    return [name, value]
}

export const setButtonText = (text: string) => {
    if (button.current) {
        button.current.innerText = text
    }
}

export const changeFormState = (name: string, value: string, buttonText: string = '') => {
    if (nameInput.current && valueInput.current) {
        nameInput.current.value = name
        valueInput.current.value = value
    }
    if (buttonText) {
        if (button.current) {
            button.current.innerText = buttonText
        }
    }
}

export const setNewService = (setServices: SetServices, services: Service[], buttonText: string) => {
    setServices(services.sort((a, b) => a.value - b.value))
    changeFormState('', '', buttonText)
}