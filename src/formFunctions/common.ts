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

export const valueAndDateFormat = (targetValue: Number, targetDate: string) => {

    const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(Number(targetValue)).replace('R$', '')

    const date = format(parseISO(targetDate), 'dd/MM')

    return [value, date]
    
}