import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      
  
    }
  
  }, [isSubmitting]);

  return (
    <div className="text-2xl gap-4 grid sm:p-4 rounded-lg">
      <h2 className="text-3xl font-bold">Create Budget</h2>
      <fetcher.Form method="post" className=" grid gap-2" ref={formRef}>
        <div className="grid gap-2 font-medium">
          <label htmlFor="newBudget" >Budget Name</label>
          <input
            ref={focusRef}
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="Groceries"
            className="bg-transparent h. rounded-md  px-2  outline outline-2 border-violet-400 border-2 outline-none outline-offset-0  w-fit sm:w-auto   "
          />
        </div>
        <div className="grid gap-2 font-medium">
          <label htmlFor="NewBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., 350"
            inputMode="decimal"
            required
            className="bg-transparent w-fit sm:w-auto rounded-md  px-2  outline outline-2 border-violet-400 border-2 outline-none outline-offset-0    "
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button
          disabled={isSubmitting}
          className={`flex text-white  w-fit p-2 bg-slate-700 mt-2 rounded-md items-center gap-2 px-4 hover:shadow-2xl hover:scale-105 ease-in duration-100 ${
            isSubmitting ? "bg-slate-500" : " bg-slate-700"
          }`}
          type="submit"
        >
          {isSubmitting ? (
            <span className="text-base font-bold ">Creating budget</span>
          ) : (
            <>
              {" "}
              <span className=" text-xl font-bold ">Create Your Budget </span>
              <CurrencyDollarIcon width={30} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
