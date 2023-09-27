import { format, parseISO } from 'date-fns'
import { Service, Services } from '../types/services'
import { Scheduling } from 'types/schedulings'
import { Expense } from 'types/expenses'

export const validNumber = (value: string) => {
    const regex = /^[0-9.]+$/
        if (regex.test(value)) {
            return true
        } else {
            return false
        }
}

type Payload = Service | Scheduling | Expense

export const fetchOptions = (targetMethod: string, payload: Payload) => {
    return {
        method: targetMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }
}

export const deleteFetchOptions = (targetId: string) => {
    return {
        method: 'delete',
        headers: { 'Content-Type': 'text/plain' },
        body: targetId
    }
}

export const moneyFormat = (value: number) => {
    const formatedData =  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(Number(value)).replace('R$', '')
    return formatedData
}

export const dateFormat = (date: string) => {
    const formatedDate = format(parseISO(date), 'dd/MM')
    return formatedDate
}

export const orderServices = (services: Services) => {

    const orderedServices = services.sort((a, b) => {
        // Pegando o último valor salvo do serviço
        const aLastValue = a.value.length - 1
        const bLastValue = b.value.length - 1
        return a.value[aLastValue].value - b.value[bLastValue].value
    })

    return orderedServices
    
}

export const getCurrentDate = () => {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const day = String(new Date().getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const getCurrentMonth = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')
    return `${currentYear}-${currentMonth}`
}