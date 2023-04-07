// rrd imports
import { Link, useFetcher } from "react-router-dom";

// library import
import { TrashIcon } from "@heroicons/react/24/solid";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

const ExpenseItem = ({ expense }) => {
  const fetcher = useFetcher();

  return (
    <>
      <div className="truncate w-fit">{expense.name}</div>
      <div className="truncate w-fit ">{formatCurrency(expense.amount)}</div>
      <div className="flex gap-1 items-center sm:gap-4 justify-between w-full">
        {formatDateToLocaleString(expense.createdAt)}{" "}
        <fetcher.Form className="grid " method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning self-center"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon className="hover:scale-110 duration-200 ease-in-out" width={25} />
          </button>
        </fetcher.Form>
      </div>
    </>
  );
};
export default ExpenseItem;
