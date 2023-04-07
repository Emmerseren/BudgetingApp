// component import
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, budget }) => {
  const hueIncrement = 360 / expenses.length;

  return (
    <div className="lg:w-7/12 flex-grow w-full  border-accent border-2  rounded-lg"   style={{ "--accent": `hsl(${budget.color})` }} >
          <div className="grid grid-cols-3 font-semibold py-5 border-violet-300  justify-between w-full text-xl sm:text-3xl"  >
            {["Name", "Amount", "Date", ].map((i, index) => (
              <div className="px-3 py-1" key={index}>{i}</div>
            ))}
          </div>
          {expenses.map((expense, i) => (
            <div  className=" grid grid-cols-3 px-2  py-3 gap-0 sm:gap-4 shadow-accent shadow-customThree  text-lg font-semibold sm:text-3xl " key={expense.id} style={{ "--accent": `hsl(${i * hueIncrement}, 40%, 50%)` }}>
              <ExpenseItem expense={expense}  />
            </div>
          ))}
    </div>
  );
};
export default Table;