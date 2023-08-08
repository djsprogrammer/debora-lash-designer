import { useContext, useState } from 'react'
import ServiceTable from './components/serviceTable/Index'
import GenericForm from './components/GenericForm'
import AnyServiceAdvice from './components/AnyServiceAdvice'
import { ServicesContext } from '../ServicesContext'

export const DB_ERROR_TEXT = 'Erro ao consultar banco de dados'
export const SERVER_ERROR_TEXT = 'Erro ao conectar com o servidor'
export const BLOCKED_ACTIONS_TEXT = 'Já existe um processo em andamento'

const Index = () => {

    const [services] = useContext(ServicesContext)
    const [searchKey, setSearchKey] = useState('')
    const [editForm, setEditForm] = useState(false)
    const [blockedActions, setBlockedActions] = useState(false)

    return (
        <div className='container'>
            <h4 className='my-4 text-center'>Seus Serviços</h4>
            {services[0] ? <ServiceTable setSearchKey={setSearchKey} setEditForm={setEditForm} blockedActions={blockedActions} setBlockedActions={setBlockedActions} /> : <AnyServiceAdvice />}
            <GenericForm searchKey={searchKey} editForm={editForm} setEditForm={setEditForm} blockedActions={blockedActions} setBlockedActions={setBlockedActions} />
        </div>
    )

}

export default Index