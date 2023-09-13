import { useContext, useState, useEffect } from 'react'

import { getCurrentMonth, moneyFormat } from 'formFunctions/common'

import { Props as FinancialMetricsProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'

import { DocsContext } from 'DocsContext'

const FinancialMetrics = ({ setCurrentPage }: FinancialMetricsProps) => {

    const [schedulings] = useContext(DocsContext).schedulings

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    const filteredShedulings = () => {
        return schedulings.filter(scheduling => {
            return scheduling.date.slice(0, 7) === financialFilter
        })
    }

    const getFinancialIncome = () => {
        return filteredShedulings().reduce((acc, current) => {
            const values = current.service.value
            let sum = 0
            for (const value of values) {
                sum += value
            }
            return acc + sum
        }, 0)
    }

    useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

    return (
        <div className='container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <ul className='mt-2 list-group'>
                <li className='list-group-item'>Receita: {filteredShedulings()[0] ? moneyFormat(getFinancialIncome()) : null}</li>
                <li className='list-group-item'>Custo: </li>
                <li className='list-group-item'>Lucro: </li>
                <li className='list-group-item'>Margem de Lucro: </li>
            </ul>
        </div>
    )
    
}

export default FinancialMetrics