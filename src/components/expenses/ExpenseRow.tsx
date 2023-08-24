import { valueAndDateFormat } from 'formFunctions/common'
import { Expense } from 'types/expenses'

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
        </tr>
    )

}

export default ExpenseRow