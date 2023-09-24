const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const GET_ALL_DOCS = `${BACKEND_URL}/all`

export const CREATE_SCHEDULING = `${BACKEND_URL}/create-scheduling`
export const CREATE_SERVICE = `${BACKEND_URL}/create-service`
export const CREATE_EXPENSE = `${BACKEND_URL}/create-expense`

export const EDIT_SERVICE = `${BACKEND_URL}/edit-service`

export const DELETE_SCHEDULING = `${BACKEND_URL}/delete-scheduling`
export const DELETE_SERVICE = `${BACKEND_URL}/delete-service`
export const DELETE_EXPENSE = `${BACKEND_URL}/delete-expense`