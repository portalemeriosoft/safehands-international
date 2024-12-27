import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { UserCircleIcon as UserIcon } from "@heroicons/react/24/solid";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import { userState } from "../store/userSlice";

import { NavLink, Link, useNavigate } from "react-router-dom";

let navigation = [];

let userNavigation = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ content, title, addBtnTxt, addBtnPath }) {
  const navigate = useNavigate()
  const user = useSelector(userState);
  console.log(user);
  if (user && user.data && user.data.role === 1) {
    userNavigation = [
      {
        name: "Your Profile",
        href: "/profile",
        icon: (
          <UserCircleIcon className="block h-5 w-5 m-1" aria-hidden="true" />
        ),
      },
      {
        name: "Settings",
        href: "/settings",
        icon: (
          <WrenchScrewdriverIcon
            className="block h-5 w-5 m-1"
            aria-hidden="true"
          />
        ),
      },
      {
        name: "Logout",
        href: "/logout",
        icon: (
          <ArrowLeftStartOnRectangleIcon
            className="block h-5 w-5 m-1"
            aria-hidden="true"
          />
        ),
      },
    ];
    navigation = [
      { name: "Dashboard", href: "/", current: true },
      { name: "Users", href: "/users", current: false },
      { name: "Requests", href: "/requests", current: false },
      { name: "Bookings", href: "/bookings", current: false },
      { name: "Invoices", href: "/invoices", current: false },
    ];
  }

  if (user && user.data && (user.data.role === 2 || user.data.role === 3)) {
    userNavigation = [
      {
        name: "Your Profile",
        href: "/profile",
        icon: (
          <UserCircleIcon className="block h-5 w-5 m-1" aria-hidden="true" />
        ),
      },
      {
        name: "Logout",
        href: "/logout",
        icon: (
          <ArrowLeftStartOnRectangleIcon
            className="block h-5 w-5 m-1"
            aria-hidden="true"
          />
        ),
      },
    ];
    navigation = [
      { name: "My Requests", href: "/my-requests", current: false },
      { name: "My Bookings", href: "/bookings", current: false },
      { name: "Invoices", href: "/invoices", current: false },
    ];
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-violet-950">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <NavLink
                        to={
                          user && user.data && user.data.role === 1
                            ? "/"
                            : "/my-requests"
                        }
                      >
                        <img
                          className="h-11 "
                          src={process.env.PUBLIC_URL + "/images/logo.png"}
                          alt="Safehands International"
                        />
                      </NavLink>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive, isPending }) =>
                              classNames(
                                isActive
                                  ? "bg-cyan-50 text-black"
                                  : "text-gray-300 hover:bg-cyan-100 hover:text-black",
                                "rounded-full px-3 py-2 text-sm font-medium"
                              )
                            }
                            aria-current={({ isActive, isPending }) =>
                              isPending ? "" : isActive ? "page" : ""
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button
                        type="button"
                        className="relative rounded-full bg-cyan-100 p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <UserIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* Profile dropdown */}
                      <div className="py-2">
                        <span className="block leading-2 text-gray-300 text-right rounded-full text-sm font-medium">
                          {user.data.name}
                        </span>
                        <span className="leading-3 block text-xs text-right text-stone-300">
                          {user.data.role && user.data.role === 1
                            ? "Admin"
                            : user.data.role && user.data.role === 2
                              ? "Driver"
                              : user.data.role && user.data.role === 3
                                ? "Customer"
                                : "Account type: Not Available"}
                        </span>
                      </div>
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="shadow-inner relative bg-cyan-100 p-0 flex max-w-xs items-center rounded-full text-sm focus:outline-none text-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            {user && user.data && user.data.photo ? (
                              <img
                                className="h-10 w-10 rounded-full"
                                src={user.data.photo}
                                alt=""
                              />
                            ) : (
                              <span className="profile-photo">
                                {
                                  (user.data.name.substring(0, 1) +
                                    user.data.name.substring(
                                      user.data.name.indexOf(" ") + 1,
                                      user.data.name.indexOf(" ") + 2
                                    ))
                                }
                              </span>
                            )}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "px-4 py-1 text-sm text-gray-700 flex items-center"
                                    )}
                                  >
                                    {item.icon}
                                    {item.name}
                                  </NavLink>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-full bg-cyan-200 p-2 text-black hover:bg-cyan-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-cyan-50">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      as="a"
                      to={item.href}
                      className={({ isActive, isPending }) =>
                        classNames(
                          isActive
                            ? "bg-cyan-100 text-black"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )
                      }
                      aria-current={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "page" : ""
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      {/* <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      /> */}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.data.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.data.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-cyan-200 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <NavLink
                        key={item.name}
                        as="a"
                        to={item.href}
                        className={({ isActive, isPending }) =>
                          classNames(
                            isActive
                              ? "bg-cyan-100 text-black"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "block rounded-md px-3 py-2 text-base font-medium"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            {addBtnTxt && addBtnPath ? (
              <button
              className="rounded-full bg-violet-950 px-3 py-1.5  text-xs font-semibold leading-6 text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => navigate(addBtnPath)}>{addBtnTxt}</button>
            ) : null}
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {content}
          </div>
          <ToastContainer />
        </main>
      </div>
    </>
  );
}
