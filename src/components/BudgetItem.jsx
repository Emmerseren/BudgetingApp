import { TrashIcon } from "@heroicons/react/24/solid";
import { Link, useFetcher } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPrecentage,
  getAllMatchingItems,
} from "../helpers";

const BudgetItem = ({ budget }) => {
  const fetcher = useFetcher();
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div className="  flex justify-between   flex-grow  items-end ">
      <Link
        className=" hover:shadow-accent hover:shadow-customThree  rounded-lg bg-gray-800 w-full  duration-200 ease-in-out"
        style={{ "--accent": `hsl(${color})` }}
        to={`budget/${id}`}
      >
        <div
          className="  rounded-bl-lg shadow-customTwo p-3 shadow-accent  "
          style={{ "--accent": `hsl(${color})` }}
        >
          <div className="text-xl items-center flex justify-between">
            <h3 className="">{name}</h3>
            <p>
              {formatCurrency(amount)} <br /> Budgeted
            </p>
          </div>
          <progress
            className="[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg    [&::-webkit-progress-bar]:bg-gray-500 [&::-webkit-progress-value]:bg-accent [&::-moz-progress-bar]:accent"
            max={amount}
            value={spent}
          >
            {formatPrecentage(spent / amount)}
          </progress>

          <div className="flex justify-between">
            <small>{formatCurrency(spent)} spent</small>{" "}
            <small>{formatCurrency(amount - spent)} remaining</small>
          </div>
        </div>
      </Link>
      <fetcher.Form
        className="h-fit shadow-accent  shadow-customTwo rounded-r-lg p-1  "
        style={{ "--accent": `hsl(${color})` }}
        method="post"
      >
        <input type="hidden" name="_action" value="deleteBudget" />
        <input type="hidden" name="budgetId" value={id} />
        <button
          className="hover:scale-110  duration-200 ease-in-out "
          type="submit"
          aria-label={`Delete ${name} budget`}
        >
          {" "}
          <TrashIcon width={30} />{" "}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default BudgetItem;
