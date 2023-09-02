import { useContext, useState, useEffect } from 'react'
import AddFormButtons from 'components/pages/AddFormButtons'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { ServicesContext } from 'ServicesContext'
import { CREATE_SERVICE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT, INVALID_NUMBER_TEXT } from 'constants/errors'
import { BooleanSet } from 'types/common'
import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import NameInput from 'components/forms/NameInput'
import ValueInput from 'components/forms/ValueInput'
import { Service } from 'types/services'

const ALREADY_EXISTS_TEXT = 'Já existe um serviço com esse nome!'

interface Props {
    setAddServiceForm: BooleanSet
}

const AddServiceForm = ({ setAddServiceForm }: Props) => {

    const [services, setServices] = useContext(ServicesContext)
    const [blockedActions, setBlockedActions] = useState(false)
    const [currentDate, setCurrentDate] = useState('')
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [allInputsFilled, setAllInputsFilled] = useState(false)

    // Usando a data atual para salvar o serviço
    useEffect(() => {
        const year = new Date().getFullYear()
        const month = String(new Date().getMonth() + 1).padStart(2, '0')
        const day = String(new Date().getDate()).padStart(2, '0')
        setCurrentDate(`${year}-${month}-${day}`)
    }, [])

    // Verificando se todos os inputs foram preenchidos
    // Pois caso não tenham sido, será impedido a mudança no comportamento do botão
    useEffect(() => {
        if (name && value) {
            setAllInputsFilled(true)
        }
    }, [name, value])

    const addService = () => {
        if (!blockedActions) {
            setBlockedActions(true)
            const alreadyExists = services.filter(service => service._id === name)[0]
            if (!alreadyExists) {
                if (validNumber(value)) {
                    const service: Service = {
                        _id: name, value: [{
                            value: Number(value),
                            date: currentDate
                        }]
                    }
                    const options = fetchOptions('post', service)
                    fetch(CREATE_SERVICE, options)
                        .then(res => {
                            switch (res.status) {
                                case 201:
                                    const newServices = [...services, service]
                                        .sort((a, b) => {
                                            // Pegando o último valor salvo do serviço
                                            const aLastValue = a.value.length - 1
                                            const bLastValue = b.value.length - 1
                                            return a.value[aLastValue].value - b.value[bLastValue].value
                                        })
                                    setServices(newServices)
                                    break
                                case 503:
                                    alert(DATABASE_ERROR_TEXT)
                                    break
                            }
                            setBlockedActions(false)
                            setAddServiceForm(false)
                        }).catch(() => {
                            alert(SERVER_ERROR_TEXT)
                            setBlockedActions(false)
                            setAddServiceForm(false)
                        })
                } else {
                    alert(INVALID_NUMBER_TEXT)
                    setBlockedActions(false)
                    setAddServiceForm(false)
                }
            } else {
                alert(ALREADY_EXISTS_TEXT)
                setBlockedActions(false)
                setAddServiceForm(false)
            }
        }
    }

    return (
        <Container>
            <FormHeader page='Serviço' />
            <div className='card-body'>
                <form className='d-flex flex-column' onSubmit={e => {
                    e.preventDefault()
                    addService()
                }}>
                    <NameInput setName={setName} />
                    <ValueInput margin='my-3' setValue={setValue} />
                    <AddFormButtons
                        allInputsFilled={allInputsFilled}
                        blockedActions={blockedActions}
                        setAddForm={setAddServiceForm}
                    />
                </form>
            </div>
        </Container>
    )

}

export default AddServiceForm