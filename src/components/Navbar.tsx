"use client";
import { adminNavOptions, navOptions } from "@/utils/nav";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie"


export default function Navbar() {


  const {isAuthUser,setAuthUser,setUser}=useContext(GlobalContext);
  const isAdmin = false;
  const router = useRouter();

  function handleLogout() {
    setAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  function NavItems({ isModal = false, isAdminView }: any) {
    return (
      <div
        id="nav-items"
        className={`items-center justify-between w-full md:flex md:w-auto ${
          isModal ? "block" : "hidden"
        }`}
      >
        <ul
          className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
            isModal ? "border-none" : "border border-gray-100"
          }`}
        >
          {isAdminView
            ? adminNavOptions.map((item) => (
                <Link
                  href={item.path}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                  key={item.id}
                >
                  {item.label}
                </Link>
              ))
            : navOptions.map((item) => (
                <Link
                  href={item.path}
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                  key={item.id}
                >
                  {item.label}
                </Link>
              ))}
        </ul>
      </div>
    );
  }
  return (
    <nav className="bg-[#7FC7D9] fixed w-full z-20 top-0 left-0 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center cursor-pointer">
          <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase text-cyan-800 ruslan-display-regular">
            tourism resinnace
          </span>
        </div>
        <div className="flex md:order-2 gap-2 text-cyan-900">
          {isAdmin && isAuthUser ? (
            <Fragment>
              <Button>admin</Button>
              <Button>profile</Button>
            </Fragment>
          ) : null}

          {
            // if user isn't authenticated, show login button and register link. If they are, show logout button and profile link
            
            isAuthUser ? (
              <Fragment>
                <Button>Profile</Button>
                <Button onClick={handleLogout}>logout</Button>
              </Fragment>
            ) : (
              <Fragment>
                <Button onClick={()=>{router.push("/login")}}>login</Button>
              </Fragment>
            )
          }
          <Button
              data-collapse-toggle="navbar-sticky"
              size="small"
              aria-controls="navbat-sticky"
              aria-expanded="false"
              className="md:hidden text-gray-500"
              onClick={() => {
                // setShowNavModal(!showNavModal);
              }}
            >
              <MenuIcon />
            </Button>
        </div>
        <NavItems isAdminView={isAdmin} />
      </div>
      <></>
    </nav>
  );
}
