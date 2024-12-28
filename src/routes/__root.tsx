import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
export const Route = createRootRoute({
  component: () => (
    <>
      <div className="navbar bg-base-100 w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 font-semibold p-2 shadow"
            >
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/tips">Tips</Link>
              </li>
            </ul>
          </div>
          <Link to="/" className="ml-3" id="eco">
            eco | steps
          </Link>
        </div>
        <div className=" w-full place-content-end hidden lg:flex font">
          <ul className="menu menu-horizontal px-1 text-black font-semibold mr-3">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/tips">Tips</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  ),
});
