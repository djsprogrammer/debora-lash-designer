import { Value } from 'types/services'

export const getRightValue = (schedulingDate: string, serviceValues: Value[]) => {
    const previousValues: number[] = []
    serviceValues.forEach(value => {
        if (value.date.localeCompare(schedulingDate) < 0) {
            previousValues.push(value.value)
        }
    })
    const initialValue = serviceValues[0].value
    const lastValue = previousValues[previousValues.length - 1]
    if (lastValue) {
        return lastValue
    }
    /* Retornando o valor inicial
    caso o serviço não tenha sofrido edições */
    return initialValue
}

export const sumOfServices = (servicesValue: number[]) => {
    return servicesValue.reduce((acc, current) => {
        return acc + current
    }, 0)
}