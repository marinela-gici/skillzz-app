import { React, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import DarkMode from "./DarkMode";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Category", href: "#", current: false },
  { name: "Post a Job", href: "#", current: false },
  { name: "Contact", href: "#", current: false },
];

const Navbar = (props) => {
    const {darkMode, toggleDarkMode} = props;

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-primary_green hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary_green">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                <div className="md:flex hidden flex-shrink-0 items-center">
                  <a href="#" className="dark:text-primary_pink text-primary_green text-3xl">
                    skillzz<span className="text-5xl leading-4 dark:text-primary_green text-primary_pink">.</span>
                  </a>
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="dark:text-white text-black hover:bg-primary_pink hover:text-white rounded-md px-3 py-2 text-lg font-large"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
                <Menu as="div" className="relative ml-3 flex items-center">
                  <button
                    type="button"
                    className="bg-primary_green rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 mr-2.5"
                  >
                    Post a Job
                  </button>
                  <button
                    type="button"
                    className="bg-primary_pink rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 mr-2.5"
                  >
                    Find a Job
                  </button>
                  <DarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block dark:text-white text-black hover:bg-primary_pink hover:text-white rounded-md px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
