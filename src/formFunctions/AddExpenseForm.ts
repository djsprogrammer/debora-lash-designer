import { InputRef } from 'types/common'

let valueRef: InputRef

export const saveRefsInMemory = (value: InputRef) => {
	valueRef = value
}

export const getExpenseInfo = () => {
	let value = ''
	if (valueRef.current) {
        value = valueRef.current.value		
	}
	return [value]
}