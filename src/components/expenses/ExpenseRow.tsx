import DeleteButton from 'components/pages/DeleteButton'
import { valueAndDateFormat } from 'formFunctions/common'
import { Expense, SetExpense } from 'types/expenses'

interface Props {
    expense: Expense
    setTargetExpense: SetExpense
    setDeleteExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpenseRow = ({ expense, setTargetExpense, setDeleteExpenseForm }: Props) => {

    const [value, date] = valueAndDateFormat(expense.value, expense.date)

    return (
        <tr key={expense.name}>
            <td>{expense.name}</td>
            <td>{value}</td>
            <td>{date}</td>
            <td>
                <DeleteButton onClick={() => {
                    setDeleteExpenseForm(true)
                    setTargetExpense(expense)
                }} />
            </td>
        </tr>
    )

}

export default ExpenseRow