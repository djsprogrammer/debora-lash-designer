import React from 'react'
import { Service, SetServices } from '../types/services'

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