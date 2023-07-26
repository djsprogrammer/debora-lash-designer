export const validNumber = (value: string) => {
    const regex = /^[0-9,.]+$/
        if (regex.test(value)) {
            return true
        } else {
            return false
        }
}