import { format, parseISO } from 'date-fns'
import { Service } from '../types/services'
import { ServiceScheduling } from 'types/schedulings'
import { Expense } from 'types/expenses'

export const validNumber = (value: string) => {
    const regex = /^[0-9.]+$/
        if (regex.test(value)) {
            return true
        } else {
            return false
        }
}

type Payload = Service | ServiceScheduling | Expense

export const fetchOptions = (targetMethod: string, payload: Payload) => {
    return {
        method: targetMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
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