import { getCurrentDate } from 'formFunctions/common'

export const generateNewValue = (value: string) => {
    return {
        value: Number(value),
        date: getCurrentDate()
    }
}