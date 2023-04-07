import { ArrowUturnLeftIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useRouteError } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  const navigate = useNavigate()

  return(

    <div className="font-bold grid justify-center h-fit text-xl self-center">
      <h1 className="text-4xl">Uh oh! We've got a problem.</h1>
      <p className="text-3xl">{error.message || error.statusText}</p>
      <div className="flex justify-between">
        <button onClick={() => navigate(-1)} className="flex gap-2 bg-violet-400 p-2 mt-2 rounded-md items-center hover:shadow-2xl hover:scale-105 ease-in duration-100 " >
          <ArrowUturnLeftIcon width={20}/>
          <span>Go Back</span>
        </button>
        <Link to="/" className="flex gap-2 bg-violet-400 p-2 mt-2 rounded-md items-center hover:shadow-2xl hover:scale-105 ease-in duration-100 ">
          <HomeIcon width={20}/>
            <span>Go Home</span>
          </Link>
      </div>
    </div>
    )
};

export default Error;
