import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { Listbox } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: {
    height: 0,
  },
  show: {
    height: "auto",
    transition: {
      duration: 0.2,
      staggerChildren: 0.03,
    },
  },
};

const itemA = {
  hidden: { opacity: 0, x: -100, transition: { duration: 0 } },
  show: { opacity: 1, x: 0 },
};

const AddExpenceForm = ({ budgets, color }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef();
  const focusRef = useRef();

  const lastBudget = budgets.length - 1;

  const [budgetName, setBudgetName] = useState(budgets[lastBudget].name);
  const [budgetid, setBudgetId] = useState(budgets[lastBudget].id);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
    setBudgetName(budgets[lastBudget].name);
    setBudgetId(budgets[lastBudget].id);
  }, [isSubmitting, lastBudget]);
  return (
    <div className="text-2xl gap-4 grid sm:p-4 rounded-lg">
      <h2 className="font-bold">
        {" "}
        Add New{" "}
        <span
          className={`${color ? "text-accent" : "text-violet-400"}`}
          style={{ "--accent": `hsl(${color})` }}
        >
          {budgetName} {" "}
        </span>
        Expense{" "}
      </h2>

      <fetcher.Form required method="post" className="" ref={formRef}>
        <div className="grid gap-4 font-medium ">
          <div className="grid gap-2">
            <label htmlFor="newExpense"> Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffe"
              className={`bg-transparent h. w-fit sm:w-auto  rounded-md  px-2  outline outline-2 ${
                color ? "border-accent" : "border-violet-400"
              } border-2 outline-none outline-offset-0`}
              style={{ "--accent": `hsl(${color})` }}
              ref={focusRef}
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              className={`bg-transparent h. w-fit sm:w-auto  rounded-md  px-2  outline outline-2 ${
                color ? "border-accent" : "border-violet-400"
              } border-2 outline-none outline-offset-0`}
              style={{ "--accent": `hsl(${color})` }}
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>

          <label
            htmlFor="newExpenseBudget"
            className={`${color ? "hidden" : "block"}`}
          >
            {" "}
            Budget Category
          </label>

          <div className="grid  grid-cols-2  " hidden={budgets.length === 1}>
       
            <Listbox
              value={budgetid}
              onChange={setBudgetId}
              name="newExpenseBudget"
            >
              
              {({ open }) => (
                <>
                  <Listbox.Button
                    aria-required
                    className={`flex ${
                      open && "mb-0"
                    } bg-slate-700  text-white text-xl font-bold w-fit h-fit p-2 px-4 self-start   rounded-md  items-start gap-2 hover:shadow-2xl hover:scale-105 ease-in duration-100 ${
                      color ? "hidden" : "block"
                    }`}
                  >
                    {budgetName} <EllipsisHorizontalIcon width={30} />
                  </Listbox.Button>

                  <AnimatePresence>
                    {open && (
                      <Listbox.Options
                        static
                        as={motion.div}
                        variants={container}
                        defaultChecked={budgetid}
                        initial="hidden"
                        exit="hidden"
                        animate="show"
                        className="list-none   justify-startq flex flex-wrap flex-initial mt-2 col-span-full  w-full  overflow-hidden   rounded-md  text-white "
                      >
                        <div className="  flex flex-wrap w-full lg:w-1/2 gap-2   ">
                          {budgets
                            .sort((a, b) => a.createdAt - b.createdAt)
                            .map((budget) => (
                              <Listbox.Option
                                className="cursor-pointer flex-grow  bg-slate-700  rounded-md shadow-2xl text-center py-2 px-4 outline outline-none hover:bg-slate-800"
                                style={{ "--accent": `hsl(${color})` }}
                                transition={{
                                  type: "spring",
                                  stiffness: 100,
                                }}
                                as={motion.div}
                                variants={itemA}
                                onClick={() => setBudgetName(budget.name)}
                                key={budget.id}
                                value={budget.id}
                              >
                                {({ selected }) => (
                                  <li
                                    className={`${
                                      selected &&
                                      "flex justify-between items-center "
                                    }`}
                                  >
                                    {budget.name}
                                    {selected && (
                                      <CheckCircleIcon
                                        className="stroke-2"
                                        width={30}
                                      />
                                    )}
                                  </li>
                                )}
                              </Listbox.Option>
                            ))}
                        </div>
                      </Listbox.Options>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Listbox>
            <input type="hidden" name="_action" value="createExpense" />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex text-white justify-self-end items-start self-start col-start-2 row-start-1 bg-slate-700  px-4 text-xl  w-fit p-2  rounded-md gap-2 hover:shadow-2xl hover:scale-105 ease-in duration-100 ${
              isSubmitting ? "bg-slate-500 " : "bg-slate-700 "
            }`}
          >
            {isSubmitting ? (
              <span className=" font-bold ">Adding Expense</span>
            ) : (
              <>
                {" "}
                <span className="  font-bold ">Create  </span>
                <PlusCircleIcon width={30} />
              </>
            )}
          </button>
         </div>

         
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenceForm;
