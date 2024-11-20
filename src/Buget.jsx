import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { budgetAdd, budgetExpenstion, deletUser } from './Redux/actions/actionBudget'

function Budget() {
    const [Budget, setBudget] = useState('')
    const [name, setName] = useState('')
    const [Amount, setAmount] = useState('')
    const [totalBudget, setTotalBudget] = useState(null) // Store total budget
    const dispatch = useDispatch()
    const bDataes = useSelector(state => state.bdeta.budgetData)

    const deletDate = (id) => {
        console.log();
        
        dispatch(deletUser(id))
     }

    const handleSetBudget = (e) => {
        e.preventDefault()
        if (!totalBudget) { // Allow setting the budget only once
            setTotalBudget(parseFloat(Budget)) // Save the total budget
            dispatch(budgetAdd({ Budget: parseFloat(Budget) }))
        } else {
            alert('Budget can only be set once!')
        }
    }

    const handleAddExpense = (e) => {
        e.preventDefault()
        let obj = {
            id: Math.floor(Math.random()*1000000),
            name: name,
            Amount: parseFloat(Amount), // Ensure Amount is a number
        }
        dispatch(budgetExpenstion(obj))
    }

    // Calculate total expenses
    const totalExpenses = bDataes.reduce((total, item) => {
        return total + (parseFloat(item.Amount) || 0)
    }, 0)

    // Calculate remaining budget
    const remainingBudget = totalBudget ? totalBudget - totalExpenses : 0

    return (
        <>
            <div>
                <div align='center'>
                    <h2>Budget App</h2>
                    <form onSubmit={handleSetBudget}>
                        <table border={1}>
                            <tr>
                                <td>Set Budget</td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        value={Budget}
                                        onChange={(e) => setBudget(e.target.value)}
                                        disabled={!!totalBudget} // Disable if budget is already set
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="submit"
                                        value="Set Budget"
                                        disabled={!!totalBudget} // Disable button if budget is already set
                                    />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>

                <div align='center'>
                    <h2>Expenses App</h2>
                    <form onSubmit={handleAddExpense}>
                        <table border={1}>
                            <tr>
                                <td>Add Expense</td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder='Expense Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        placeholder='Amount'
                                        value={Amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="submit" value="Add Expense" />
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
            </div>

            <br />

            <div align='center'>
                <h2>Budget Summary</h2>
                <h3>Total Budget: {totalBudget || 0}</h3>
                <h3>Total Expenses: {totalExpenses}</h3>
                <h3>Remaining Budget: {remainingBudget}</h3>
            </div>

            <div align='center'>
                <h3>Expense List</h3>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Expense Name</th>
                            <th>Amount</th>
                            <th>Delet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bDataes.map((val, index) => (
                            <tr key={index}>
                                <td>{val.name}</td>
                                <td>{val.Amount}</td>
                                <td><button onClick={() => deletDate(val.id)}>delet</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Budget
