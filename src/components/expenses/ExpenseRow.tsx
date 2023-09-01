import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { moneyFormat, dateFormat } from 'formFunctions/common'
import { Expense } from 'types/expenses'

interface Props {
    expense: Expense
    setTargetId: React.Dispatch<React.SetStateAction<string>>
    setDeleteExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpenseRow = ({ expense, setTargetId, setDeleteExpenseForm }: Props) => {

    // Deixando no formato 0,00
    const value = moneyFormat(expense.value)

    // Deixando no formato dd/mm
    const date = dateFormat(expense.date)

    return (
        <tr key={expense.name}>
            <td>{expense.name}</td>
            <td>{value}</td>
            <td>{date}</td>
            <td>
                <DeleteButton onClick={() => {
                    setDeleteExpenseForm(true)
                    setTargetId(expense._id)
                }} />
            </td>
        </tr>
    )

}

export default memo(ExpenseRow)