import React from 'react'
import { Service, SetServices } from '../types/services'

let nameInput: Input
let valueInput: Input

export const saveReferenciesOnMemory = (targetNameInput: Input, targetValueInput: Input) => {
    nameInput = targetNameInput
    valueInput = targetValueInput
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

export const getServiceInfo = () => {
    let name = ''
    let value = ''
    if (nameInput.current && valueInput.current) {
        name = nameInput.current.value
        value = valueInput.current.value
    }
    return [name, value]
}

export const changeFormState = (name: string, value: string, buttonText: string = '') => {
    if (nameInput.current && valueInput.current) {
        nameInput.current.value = name
        valueInput.current.value = value
    }
}

export const setNewService = (setServices: SetServices, services: Service[], buttonText: string) => {
    setServices(services.sort((a, b) => a.value - b.value))
    changeFormState('', '', buttonText)
}

export const showError = (alertMessage: string, setBlockedActions: React.Dispatch<React.SetStateAction<boolean>>) => {
    alert(alertMessage)
    changeFormState('', '', 'Adicionar Serviço')
    setBlockedActions(false)
}

export const responseHandler = (res: Response, successCase: number, setServices: SetServices, 
    newServices: Service[], errorText: string, buttonText: string, 
    setBlockedActions: React.Dispatch<React.SetStateAction<boolean>>) => {
    switch (res.status) {
        case successCase:
            setNewService(setServices, newServices, buttonText)
            break
        case 503:
            alert(errorText)
            changeFormState('', '', buttonText)
            break
    }
    setBlockedActions(false)
}