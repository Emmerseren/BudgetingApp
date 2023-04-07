import { Form, NavLink } from "react-router-dom";
import { BuildingStorefrontIcon, TrashIcon } from "@heroicons/react/24/solid";
const Nav = ({ userName }) => {
  return (
    <nav className=" flex justify-between h-fit   ">
      <NavLink
        to="/"
        aria-label="Go to home"
        
        className="flex items-center border-2 gap-2 rounded-md border-transparent hover:border-2 hover:border-violet-400 w-fit h-fit p-1 ease-in duration-100"
      >
        <BuildingStorefrontIcon width={30} className="text-violet-400" />
        <span className="text-lg font-bold  ">HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
          method="post"
          action="/logout"
        >
          <button
            type="submit"
            className=" items-center gap-1 flex shadow-md text-sm  bg-rose-700 rounded-md p-2 py-1 font-medium text-slate-300 hover:shadow-2xl hover:scale-105 ease-in duration-100"
          >
            <span>Delete User</span>
            <TrashIcon width={18} className="h-fit w-fit" />
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
