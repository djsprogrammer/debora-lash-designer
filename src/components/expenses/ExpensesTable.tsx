import { parseISO, format } from 'date-fns'
import { tableStyle } from 'commonStyles'
import { Expenses } from 'types/expenses'

interface Props {
    expenses: Expenses
}

const ExpensesTable = ({ expenses }: Props) => {
	return (
        <div className='table-container mb-4'>
            <table className={tableStyle}>
                <thead className='table-dark'>
                    <tr>
                        <th>Despesa</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => {

                        const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(expense.value)).replace('R$', '')
                        const date = format(parseISO(expense.date), 'dd/MM')

                        return (
                            <tr key={expense.name}>
                                <td>{expense.name}</td>
                                <td>{value}</td>
                                <td>{date}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ExpensesTable