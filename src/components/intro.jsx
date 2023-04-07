import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Form } from "react-router-dom";
const intro = () => {
  return (
    <div className=" font-bold  grid mt-5 self-center ">
      <div className="text-6xl">
        <h1 className="grid h-fit">
          Take Control Of <span className="text-violet-400"> Your Money</span>
        </h1>
        <p className="text-lg pt-4">
          Personal budgeting is the secret to finacial freedom. <br /> Start
          your journey today
        </p>
      </div>
      <Form method="post">
        <input
          type="text"
          name="userName"
          required
          placeholder="What is your name..."
          aria-label="Your Name"
          autoComplete="given-name"
          className="bg-transparent  rounded-md  px-2 mt-4  outline outline-2 border-violet-400 border-2 outline-none outline-offset-0    focus:outline-2 "
        />
        <input type="hidden" name="_action" value="newUser" />
        <button type="submit" className="flex text-white bg-violet-400 p-2 mt-2 rounded-md items-center gap-2 hover:shadow-2xl hover:scale-105 ease-in duration-100">
          <span className="text-xl" >Create Account</span>
          <UserPlusIcon width={30}/>
        </button>
      </Form>
    </div>
  );
};

export default intro;
