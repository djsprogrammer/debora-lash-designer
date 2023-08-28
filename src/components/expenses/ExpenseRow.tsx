import { memo } from 'react'
import DeleteButton from 'components/pages/DeleteButton'
import { moneyFormat, dateFormat } from 'formFunctions/common'
import { Expense, SetExpense } from 'types/expenses'

interface Props {
    expense: Expense
    setTargetExpense: SetExpense
    setDeleteExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpenseRow = ({ expense, setTargetExpense, setDeleteExpenseForm }: Props) => {

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
                    setTargetExpense(expense)
                }} />
            </td>
        </tr>
    )

}

export default memo(ExpenseRow)