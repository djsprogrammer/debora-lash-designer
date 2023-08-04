import { SetStateAction, useContext } from 'react'
import ServiceRow from './ServiceRow'
import { Service } from '../../../../types/services'
import { ServicesContext } from '../../../../ServicesContext'

const DELETE_URL = 'http://localhost:8080/delete-service'

interface Props {
    setInputsToEdit: React.Dispatch<SetStateAction<string[]>>
}

const Index = ({ setInputsToEdit }: Props) => {

    const [services, setServices] = useContext(ServicesContext)

    const deleteService = (targetService: Service) => {
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetService)
        }
        fetch(DELETE_URL, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingServices = services.filter(service => {
                            return service.name !== targetService.name
                        })
                        setServices(remainingServices)
                        setInputsToEdit([])
                        break;
                
                    case 503:
                        alert('Erro ao consultar banco de dados')
                        setInputsToEdit([])
                        break;
                }
            })
    }

    return (
        <table className='table my-4 text-center'>
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {services.map(service =>
                    <ServiceRow service={service} deleteService={deleteService} setInputsToEdit={setInputsToEdit} />)}
            </tbody>
        </table>
    )

}

export default Index