import React from 'react'
import { Service, SetServices } from '../types/services'

let nameInput: Input
let valueInput: Input

export const saveRefsInMemory = (targetNameInput: Input, targetValueInput: Input) => {
    nameInput = targetNameInput
    valueInput = targetValueInput
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

export const setNewService = (setServices: SetServices, services: Service[], buttonText: string) => {
    setServices(services.sort((a, b) => a.value - b.value))
}

export const showError = (alertMessage: string, setBlockedActions: React.Dispatch<React.SetStateAction<boolean>>) => {
    alert(alertMessage)
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
            break
    }
    setBlockedActions(false)
}