import { useState, useEffect } from 'react'

import { getCurrentMonth } from 'formFunctions/common'

import { Props as FinancialMetricsProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'

const FinancialMetrics = ({ setCurrentPage }: FinancialMetricsProps) => {

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

    return (
        <div className='container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <ul className='mt-1 list-group'>
                <li className='list-group-item'>Receita: </li>
                <li className='list-group-item'>Custo: </li>
                <li className='list-group-item'>Lucro: </li>
                <li className='list-group-item'>Margem de Lucro: </li>
            </ul>
        </div>
    )
    
}

export default FinancialMetrics