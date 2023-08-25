import { valueAndDateFormat } from 'formFunctions/common'
import { Expense } from 'types/expenses'
import { deleteButtonStyle } from 'commonStyles'

interface Props {
    expense: Expense
}

const ExpenseRow = ({ expense }: Props) => {

    const [value, date] = valueAndDateFormat(expense.value, expense.date)

    return (
        <tr key={expense.name}>
            <td>{expense.name}</td>
            <td>{value}</td>
            <td>{date}</td>
            <td><button className={deleteButtonStyle}>Excluir</button></td>
        </tr>
    )

}

export default ExpenseRow