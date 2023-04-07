import { Outlet, useLoaderData } from "react-router-dom";
import Nav from "../components/Nav";

// helper functions

import { fetchData } from "../helpers";

export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

    return (
      <>
            <Nav userName={userName} />
            <main className="">
            <Outlet />
            </main>
      </>
    )
};

export default Main;
