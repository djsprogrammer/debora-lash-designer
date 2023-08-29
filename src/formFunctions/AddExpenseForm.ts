import { InputRef } from 'types/common'

let nameRef: InputRef
let valueRef: InputRef

export const saveRefsInMemory = (name: InputRef, value: InputRef) => {
	nameRef = name 
	valueRef = value
}

export const getExpenseInfo = () => {
	let name = ''
	let value = ''
	if (nameRef.current && valueRef.current) {
		name = nameRef.current.value
        value = valueRef.current.value		
	}
	return [name, value]
}