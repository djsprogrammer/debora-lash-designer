import { useEffect, useContext, useRef } from 'react'
import { inputsValues, setButtonText, validNumber, changeFormState, saveReferenciesOnMemory } from '../../formFunctions/GenericForm'
import { ServicesContext } from '../../ServicesContext'
import { SERVER_URL } from '../../App'
import { SERVER_ERROR_TEXT, DB_ERROR_TEXT } from '../Index'

const ADD_BUTTON_TEXT = 'Adicionar Serviço'
const LOAD_BUTTON_TEXT = 'Carregando...'

const Index = () => {

    const [services, setServices] = useContext(ServicesContext)

    const nameInput = useRef<HTMLInputElement>(null)
    const valueInput = useRef<HTMLInputElement>(null)
    const button = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        saveReferenciesOnMemory(nameInput, valueInput, button)
    })

    const addService = () => {
        setButtonText(LOAD_BUTTON_TEXT)
        const [name, value] = inputsValues()
        const alreadyExists = services.filter(service => service.name === name)
        setTimeout(() => {
            if (!alreadyExists[0]) {
                if (validNumber(value)) {
                    const service = {
                        name, value: Number(value)
                    }
                    const options = {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(service)
                    }
                    fetch(`${SERVER_URL}/create-service`, options)
                        .then(res => {
                            switch (res.status) {
                                case 201:
                                    setServices(services => [...services, service])
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
                    setButtonText(ADD_BUTTON_TEXT)
                }
            } else {
                alert('Já existe um serviço com esse nome!')
                setButtonText(ADD_BUTTON_TEXT)
            }
        }, 500)
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