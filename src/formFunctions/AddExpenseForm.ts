import { InputRef } from 'types/common'

let dateRef: InputRef
let nameRef: InputRef
let valueRef: InputRef

export const saveRefsInMemory = (date: InputRef, name: InputRef, value: InputRef) => {
	dateRef = date
	nameRef = name 
	valueRef = value
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