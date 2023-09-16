import { useEffect, useContext, useState } from 'react'

import { getCurrentMonth } from 'formFunctions/common'
import { filteredExpenses, filteredSchedulings } from 'formFunctions/info/common'

import { Props as InfoProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialIncome from 'components/info/FinancialIncome/FinancialIncome'

import { DocsContext } from 'DocsContext'
import ServicesOffered from 'components/info/ServicesOffered/ServicesOffered'

const Info = ({ setCurrentPage }: InfoProps) => {

    useEffect(() => {
        setCurrentPage(0)
    }, [setCurrentPage])

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    const [showServicesOffered, setShowServicesOffered] = useState(false)

    return (
        <div className='mt-4 container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <hr className='w-100' />
            {
                !showServicesOffered
                ? <FinancialIncome
                        schedulings={filteredSchedulings(schedulings, financialFilter)}
                        expenses={filteredExpenses(expenses, financialFilter)}
                        setShowServicesOffered={setShowServicesOffered}
                    />
                : <ServicesOffered 
                        schedulings={filteredSchedulings(schedulings, financialFilter)}
                        setShowServicesOffered={setShowServicesOffered}
                    />
            }
        </div>
    )

}

export default Info