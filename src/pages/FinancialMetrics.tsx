import { useEffect } from 'react'

import { Props as FinancialMetricsProps } from 'types/pages'

const FinancialMetrics = ({ setCurrentPage }: FinancialMetricsProps) => {

    useEffect(() => {
		setCurrentPage(1)
	}, [setCurrentPage])

    return (
        <h1>Financial Metrics</h1>
    )
    
}

export default FinancialMetrics