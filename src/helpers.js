export const waait = () => new Promise(res => setTimeout( res, Math.random() * 800
 ))

// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

// delete item

export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
   return localStorage.removeItem(key)
}

//create budget

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets") ?.
    length ?? 0
    return`${existingBudgetsLength * 50} 35% 50%`
}

export const createBudget = ({
    name, amount
})=> {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color:generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}
export const createExpense = ({
    name, amount, budgetID
})=> {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetID :budgetID
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

export const calculateSpentByBudget = (budgetID) => {

    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {

        if(expense.budgetID !== budgetID) return acc

        return acc += expense.amount
    }, 0)
    return budgetSpent
}

export const formatPrecentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "DKK"
    })
}

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

export const getAllMatchingItems = ({category, key, value}) => {
    const data = fetchData(category) ?? [];
    return data.filter((item => item[key] === value))
}