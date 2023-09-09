import { Service, Value } from 'types/services'

/* Essa função verifica se já existe algum valor registrado nessa data
antes de registrar a edição */
export const checkForValueInTheSameDate = (serviceForEdition: Service, newValue: Value) => {

    serviceForEdition.value.forEach((value, index) => {
        if (value.date === newValue.date) {
            // Removendo o valor salvo anteriormente
            serviceForEdition.value.splice(index, 1)
        }
    })

    serviceForEdition.value.push(newValue)

}