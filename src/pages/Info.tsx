import { useEffect, useContext, useState } from 'react'

import { getCurrentMonth } from 'formFunctions/common'
import { filteredExpenses, filteredSchedulings } from 'formFunctions/info/common'

import { Props as InfoProps } from 'types/pages'

import MonthInput from 'components/forms/MonthInput'
import FinancialIncome from 'components/info/FinancialIncome/FinancialIncome'
import OfferedServices from 'components/info/OfferedServices/OfferedServices'

import { DocsContext } from 'DocsContext'

const Info = ({ setCurrentPage }: InfoProps) => {

    useEffect(() => {
        setCurrentPage(0)
    }, [setCurrentPage])

    const [schedulings] = useContext(DocsContext).schedulings
    const [expenses] = useContext(DocsContext).expenses

    const [financialFilter, setFinancialFilter] = useState(getCurrentMonth())

    const [showOfferedServices, setShowOfferedServices] = useState(false)

    return (
        <div className='mt-4 container d-flex flex-column align-items-start'>
            <MonthInput setTargetFilter={setFinancialFilter} />
            <hr className='w-100' />
            {
                !showOfferedServices
                ? <FinancialIncome
                        schedulings={filteredSchedulings(schedulings, financialFilter)}
                        expenses={filteredExpenses(expenses, financialFilter)}
                        setShowOfferedServices={setShowOfferedServices}
                    />
                : <OfferedServices
                        schedulings={filteredSchedulings(schedulings, financialFilter)}
                        setShowOfferedServices={setShowOfferedServices}
                    />
            }
        </div>
    )

}

export default Info