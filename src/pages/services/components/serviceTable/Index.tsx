import { useContext } from 'react'
import ServiceRow from './ServiceRow'
import { Service } from '../../../../types/services'
import { ServicesContext } from '../../../../ServicesContext'
import { changeFormState } from '../../../../formFunctions/GenericForm'

const DELETE_URL = 'http://localhost:8080/delete-service'

const Index = () => {

    const [services, setServices] = useContext(ServicesContext)

    const deleteService = (targetService: Service) => {
        changeFormState()
        const options = {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(targetService)
        }
        setTimeout(() => {
            fetch(DELETE_URL, options)
            .then(res => {
                switch (res.status) {
                    case 204:
                        const remainingServices = services.filter(service => {
                            return service.name !== targetService.name
                        })
                        setServices(remainingServices)
                        break
                    case 503:
                        alert('Erro ao consultar banco de dados')
                        break
                }
            }).catch(() => {
                alert('Erro ao conectar com o servidor')
            })
        }, 500)
    }

    return (
        <table className='table text-center'>
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Valor</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {services.map(service =>
                    <ServiceRow service={service} deleteService={deleteService} />)}
            </tbody>
        </table>
    )

}

export default Index