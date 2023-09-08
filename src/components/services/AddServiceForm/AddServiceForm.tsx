import { useContext, useState, useEffect } from 'react'
import ConfirmFormButtons from 'components/pages/ConfirmFormButtons'
import { validNumber, fetchOptions, orderServices } from 'formFunctions/common'
import { ServicesContext } from 'ServicesContext'
import { CREATE_SERVICE } from 'constants/urls'
import { DATABASE_ERROR_TEXT, SERVER_ERROR_TEXT, INVALID_NUMBER_TEXT } from 'constants/errors'
import { BooleanSet } from 'types/common'
import Container from 'components/forms/Container'
import FormHeader from 'components/forms/Header'
import NameInput from 'components/forms/NameInput'
import ValueInput from 'components/forms/ValueInput'
import { Service } from 'types/services'
import { generateNewValue } from 'formFunctions/service/common'
import SelectCategoryInput from './SelectCategoryInput'

const ALREADY_EXISTS_TEXT = 'Já existe um serviço com esse nome!'

interface Props {
    setAddServiceForm: BooleanSet
}

const AddServiceForm = ({ setAddServiceForm }: Props) => {

    const [services, setServices] = useContext(ServicesContext)
    const [blockedActions, setBlockedActions] = useState(false)
    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const [allInputsFilled, setAllInputsFilled] = useState(false)

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
                        _id: name, 
                        value: [generateNewValue(value)]
                    }
                    const options = fetchOptions('post', service)
                    fetch(CREATE_SERVICE, options)
                        .then(res => {
                            switch (res.status) {
                                case 201:
                                    const newServices = orderServices([...services, service])
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
            <FormHeader text='Registrar Serviço' />
            <div className='card-body'>
                <form className='d-flex flex-column' onSubmit={e => {
                    e.preventDefault()
                    addService()
                }}>
                    <SelectCategoryInput />
                    <NameInput setName={setName} />
                    <ValueInput margin='my-3' setValue={setValue} />
                    <ConfirmFormButtons
                        allInputsFilled={allInputsFilled}
                        blockedActions={blockedActions}
                        setForm={setAddServiceForm}
                    />
                </form>
            </div>
        </Container>
    )

}

export default AddServiceForm