"use client";
import { adminNavOptions, dropdownMenu, navOptions } from "@/utils/nav";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useContext } from "react";
import { GlobalContext } from "@/context";
import PermIdentitySharpIcon from "@mui/icons-material/PermIdentitySharp";

export default function Navbar() {
  const { isAuthUser, setAuthUser, user, setUser } = useContext(GlobalContext);
  const isAdmin = user?.role == "admin" ? true : false;
  const router = useRouter();

  return (
    <>
      <div className="navbar bg-base-100 px-8 text-white">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-8 shadow bg-base-100 rounded-box w-52 gap-y-4 "
            >
              {isAdmin ? (
                <details>
                  <summary>User</summary>
                  <ul className="p-2">
                    {dropdownMenu.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.path}
                          className="cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:p-0"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
              {isAdmin
                ? adminNavOptions.map((item) => (
                    <li key={item.id} className="">
                      <Link
                        href={item.path}
                        className="cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:p-0"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))
                : navOptions.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className="cursor-pointer block py-2 pl-3 pr-4 text-white rounded md:p-0"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
          <h1 className="btn btn-ghost text-[.8rem] md:text-2xl" onClick={()=>{router.push("/")}}>
            Tourism Renaissance
          </h1>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              {isAdmin ? (
                <details>
                  <summary>User</summary>
                  <ul className="p-4 gap-4 z-10">
                    {dropdownMenu.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.path}
                          className="cursor-pointer  block py-2 pl-3 pr-4 text-white rounded "
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </li>

            {isAdmin
              ? adminNavOptions.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))
              : navOptions.map((item) => (
                  <li key={item.id}>
                    <Link href={item.path}>{item.label}</Link>
                  </li>
                ))}
          </ul>
        </div>
        <div className="navbar-end">
          {isAdmin && isAuthUser ? (
            <Fragment>
              <Button>admin</Button>
            </Fragment>
          ) : null}
          {isAuthUser ? (
            <Fragment>
              <Button href="/profile" size="small" color="inherit">
                <PermIdentitySharpIcon />
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button
                color="inherit"
                onClick={() => {
                  router.push("/login");
                }}
              >
                login
              </Button>
            </Fragment>
          )}
        </div>
      </div>
    </>
  );
}
