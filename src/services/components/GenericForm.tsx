import { useEffect, useContext, useRef } from 'react'
import { inputsValues, setButtonText, validNumber, changeFormState, saveReferenciesOnMemory } from '../../formFunctions/GenericForm'
import { ServicesContext } from '../../ServicesContext'

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const LOAD_BUTTON_TEXT = 'Carregando...'
const POST_URL = 'http://localhost:8080/create-service'
const DB_ERROR_TEXT = 'Erro ao consultar banco de dados'
const SERVER_ERROR_TEXT = 'Erro ao conectar com o servidor'

const Index = () => {

    const [services, setServices] = useContext(ServicesContext)

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        saveReferenciesOnMemory(nameInput, valueInput, button)
    })

    const addService = () => {
        setButtonText(button, LOAD_BUTTON_TEXT)
        const [name, value] = inputsValues(nameInput, valueInput)
        const alreadyExists = services.filter(service => service.name === name)
        const options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, value })
        }
        if (!alreadyExists[0]) {
            setTimeout(() => {
                if (validNumber(value)) {
                    fetch(POST_URL, options)
                        .then(res => {
                            switch (res.status) {
                                case 201:
                                    setServices(services => [...services, { name, value }])
                                    changeFormState(ADD_BUTTON_TEXT)
                                    break

                                case 503:
                                    alert(DB_ERROR_TEXT)
                                    changeFormState(ADD_BUTTON_TEXT)
                                    break
                            }
                        }).catch(() => {
                            alert(SERVER_ERROR_TEXT)
                            changeFormState(ADD_BUTTON_TEXT)
                        })
                } else {
                    alert('Insira um número válido (utilize ponto para casas decimais)')
                    setButtonText(button, ADD_BUTTON_TEXT)
                }
            }, 500)
        } else {
            alert('Já existe um serviço com esse nome!')
            setButtonText(button, ADD_BUTTON_TEXT)
        }
    }

    return (
        <form className='my-4 d-flex justify-content-center' onSubmit={e => {
            e.preventDefault()
            addService()
        }}>
            <input ref={nameInput} className='text-center rounded-pill border border-secondary' type='text' placeholder='Nome' required />
            <input ref={valueInput} className='mx-2 text-center rounded-pill border border-secondary' type='text' placeholder='Valor' required />
            <button ref={button} className='btn btn-dark rounded-pill' type='submit'>{ADD_BUTTON_TEXT}</button>
        </form>
    )

}

export default Index