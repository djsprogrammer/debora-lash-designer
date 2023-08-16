import { useContext, useState, useEffect } from 'react'
import ServiceTable from './components/serviceTable/ServiceTable'
import GenericForm from './components/GenericForm'
import AnyServiceAdvice from '../components/AnyAdvice'
import { ServicesContext } from '../../ServicesContext'
import { container } from '../../commonStyles'

export const DB_ERROR_TEXT = 'Erro ao consultar banco de dados'
export const SERVER_ERROR_TEXT = 'Erro ao conectar com o servidor'
export const BLOCKED_ACTIONS_TEXT = 'Já existe um processo em andamento'

interface Props {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Services = ({ setCurrentPage }: Props) => {

    useEffect(() => {
        setCurrentPage(2)
    }, [setCurrentPage])

    const [services] = useContext(ServicesContext)
    const [searchKey, setSearchKey] = useState('')
    const [editForm, setEditForm] = useState(false)
    const [blockedActions, setBlockedActions] = useState(false)

    return (
        <div className={container}>
            {services[0] ? <ServiceTable setSearchKey={setSearchKey} setEditForm={setEditForm} blockedActions={blockedActions} setBlockedActions={setBlockedActions} /> : <AnyServiceAdvice page='serviço' />}
            <GenericForm searchKey={searchKey} editForm={editForm} setEditForm={setEditForm} blockedActions={blockedActions} setBlockedActions={setBlockedActions} />
        </div>
    )

}

export default Services