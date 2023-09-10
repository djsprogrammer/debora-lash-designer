import { memo } from 'react'

import { moneyFormat, dateFormat } from 'formFunctions/common'

import { Expense } from 'types/expenses'

import DeleteButton from 'components/pages/DeleteButton'

interface ExpenseRowProps {
    expense: Expense
    setTargetId: React.Dispatch<React.SetStateAction<string>>
    setDeleteExpenseForm: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpenseRow = ({ expense, setTargetId, setDeleteExpenseForm }: ExpenseRowProps) => {

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