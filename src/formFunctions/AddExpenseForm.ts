import { InputRef, ButtonRef } from 'types/common'

let dateRef: InputRef
let nameRef: InputRef
let valueRef: InputRef
let buttonRef: ButtonRef

export const saveRefsInMemory = (date: InputRef, name: InputRef, value: InputRef, button: ButtonRef) => {
	dateRef = date
	nameRef = name 
	valueRef = value
	buttonRef = button
}

export const getExpenseInfo = () => {
	let date = ''
	let name = ''
	let value = ''
	if (dateRef.current && nameRef.current && valueRef.current) {
		date = dateRef.current.value
		name = nameRef.current.value
        value = valueRef.current.value		
	}
	return [date, name, value]
}

export const setButtonText = (text: string) => {
	if (buttonRef.current) buttonRef.current.innerText = text
}

export const resetForm = () => {
    if (dateRef.current && nameRef.current && valueRef.current) {
        dateRef.current.value = ''
        nameRef.current.value = ''
        valueRef.current.value = ''
    }
    if (buttonRef.current) buttonRef.current.innerText = 'Registrar Despesa'
}