import { useContext, useState, useEffect } from 'react'
import AddFormButtons from 'components/pages/AddFormButtons'
import NameInput from 'components/forms/NameInput'
import ValueInput from 'components/forms/ValueInput'
import { validNumber, fetchOptions } from 'formFunctions/common'
import { ServicesContext } from 'ServicesContext'
import { CREATE_SERVICE } from 'constants/urls'
import { formContainer, addFormCardStyle } from 'commonStyles'
import { SERVER_ERROR_TEXT, DB_ERROR_TEXT } from 'errorAdvices'
import { BooleanSet } from 'types/common'
import FormHeader from 'components/forms/Header'
import { Service } from 'types/services'

const INVALID_NUMBER_TEXT = 'Insira um número válido (utilize ponto para casas decimais)'
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
                        _id: name, value: {
                            value: Number(value),
                            date: currentDate
                        }
                    }
                    const options = fetchOptions('post', service)
                    fetch(CREATE_SERVICE, options)
                        .then(res => {
                            switch (res.status) {
                                case 201:
                                    const newServices = [...services, service]
                                        .sort((a, b) => a.value.value - b.value.value)
                                    setServices(newServices)
                                    break
                                case 503:
                                    alert(DB_ERROR_TEXT)
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
        <div className={formContainer}>
            <div className={addFormCardStyle}>
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
            </div>
        </div>
    )

}

export default AddServiceForm