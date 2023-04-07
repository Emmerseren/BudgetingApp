import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddExpenceForm from "../components/AddExpenceForm";
import PieChartBudget from "../components/PieChart";
import Table from "../components/Table";
import {
  calculateSpentByBudget,
  createExpense,
  deleteItem,
  formatCurrency,
  getAllMatchingItems,
} from "../helpers";

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetID",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget dosent exist");
  }
  return { budget, expenses };
}

export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const spent = calculateSpentByBudget(budget.id);
  const { amount, color, createdAt, name } = budget;
  return (
    <div className="">
      <h1 className="text-6xl py-9">
        <span className="text-accent" style={{ "--accent": `hsl(${color})` }}>
          {budget.name}
        </span>{" "}
        Overview
      </h1>
      <div>
        <h3 className="text-violet-400"></h3>
        <div
          className="p-4 mb-8  shadow-custom shadow-accent rounded-2xl  sm:w-full "
          style={{ "--accent": `hsl(${color})` }}
        >
          <AddExpenceForm budgets={[budget]} color={color} />
        </div>
        {expenses && expenses.length > 0 ? (
          <div className="flex items-center flex-wrap  gap-10">
            <Table expenses={expenses} budget={budget} />

            <PieChartBudget
              expenses={expenses}
              budget={budget}
              remaining={formatCurrency(amount - spent)}
            />
          </div>
        ) : (
          <p className="text-3xl font-semibold">No expenses yet</p>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
