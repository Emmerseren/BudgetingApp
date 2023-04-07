//LLB

import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
//COMP
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenceForm from "../components/AddExpenceForm";
import BudgetItem from "../components/BudgetItem";
import Intro from "../components/intro";
// HELPERS
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}

export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome, ${values.userName}`);
    } catch (e) {
      throw new Error("There was a problem creating your account");
    }
  }
  if (_action === "createBudget") {
    try {
      createBudget({ name: values.newBudget, amount: values.newBudgetAmount });
      return toast.success("Budget created");
    } catch (e) {
      throw new Error("There was a problem creating your budget");
    }
  }
  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetID: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created`);
    } catch (e) {
      throw new Error("There was a problem creating your expense");
    }
  }
  if (_action === "deleteBudget") {
    try {
     deleteItem({
      key: "budgets",
      id: values.budgetId
     })
      return toast.success("Budget Deleted");
    } catch (e) {
      throw new Error("There was a problem Deleting your budget");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <div className="h-fit self-center  ">
      {userName ? (
        <>
          <h1 className="py-9 font-bold text-6xl ">
            Welcome back, <span className="text-violet-400">{userName}</span>
          </h1>
            {budgets && budgets.length > 0 ? (
              < >
                <div className="p-4 mb-8 shadow-custom shadow-violet-500 rounded-2xl  sm:w-full ">
                  <AddBudgetForm />
                </div>
                <div className="p-4 mb-8  shadow-custom shadow-violet-500 rounded-2xl  sm:w-full ">
                  <AddExpenceForm budgets={budgets} />
                </div>
                <h2 className="text-3xl mb-8  font-bold">Existing Budgets</h2>
                <div className="flex mb-8   rounded-2xl  flex-wrap gap-6 justify-between">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
             
              </>
            ) : (
                
                <div className="p-4 mb-8 shadow-custom shadow-violet-500 rounded-2xl  sm:w-full ">
                <AddBudgetForm />
                </div>
            )}
        </>

      ) : (
        <Intro />
      )}
    </div>
  );
};

export default Dashboard;
